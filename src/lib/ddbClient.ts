import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({region: "us-east-1", endpoint: "http://localhost:8000"});

export { ddbClient };