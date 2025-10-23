package com.example.quizzutp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class PowerBIService {

    
    @Value("${powerbi.client.id}")
    private String clientId;

    @Value("${powerbi.client.secret}")
    private String clientSecret;

    @Value("${powerbi.tenant.id}")
    private String tenantId;

    @Value("${powerbi.workspace.id}")
    private String workspaceId;

    @Value("${powerbi.report.id}")
    private String reportId;

    public Map<String, Object> getEmbedToken() {
        try {
            String tokenUrl = "https://login.microsoftonline.com/" + tenantId + "/oauth2/v2.0/token";
            String resourceUrl = "https://api.powerbi.com/";
            
        
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            String body = "grant_type=client_credentials"
                    + "&client_id=" + clientId
                    + "&client_secret=" + clientSecret
                    + "&scope=" + resourceUrl + ".default";

            HttpEntity<String> request = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, Map.class);

            String accessToken = (String) response.getBody().get("access_token");

            // 2️⃣ Obtener el token de Power BI para embeber el reporte
            HttpHeaders reportHeaders = new HttpHeaders();
            reportHeaders.setBearerAuth(accessToken);
            HttpEntity<Void> reportRequest = new HttpEntity<>(reportHeaders);

            String embedUrl = "https://api.powerbi.com/v1.0/myorg/groups/" + workspaceId + "/reports/" + reportId;
            ResponseEntity<Map> reportResponse = restTemplate.exchange(embedUrl, HttpMethod.GET, reportRequest, Map.class);

            Map<String, Object> reportData = reportResponse.getBody();
            reportData.put("embedToken", accessToken);

            return reportData;

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("error", e.getMessage());
        }
    }
}
