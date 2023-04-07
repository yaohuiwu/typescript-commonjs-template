import { BatchGetItemCommand, ListTablesCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./lib/ddbClient";
import { ddbDocClient } from "./lib/ddbDocClient";
import { DeleteCommand, GetCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// TODO create table

// TODO batch write items

export const listTable = async () => {
    // list tables
    const commandName = "ListTablesCommand";
    const command = new ListTablesCommand({});
    try {
        const results = await ddbClient.send(command);
        console.log(`${commandName} result:\n` + results.TableNames?.join("\n"));
    } catch (err) {
        console.log(`${commandName}` + err)
    }
};

//https://docs.aws.amazon.com/zh_cn/amazondynamodb/latest/APIReference/API_GetItem.html
export const getItem = async () => {
    const command = "GetItem";
    try {
        const data = await ddbDocClient.send(new GetCommand({
            TableName: "Music",
            Key: {
                "Artist": "Acme Band",
                "SongTitle": "Happy Day",
            }
        }));
        console.log(command + " Success :", data.Item);
    } catch (err) {
        console.log(command + " Error", err);
    }
};

export const batchGetItem = async () => {
    const command = "BatchGetItem";
    const params = {
        RequestItems: {
            "Music": {
                Keys: [
                    {
                        "Artist": { S: "No One You Know" },
                        "SongTitle": { S: "Call Me Today" },
                    },
                    {
                        "Artist": { S: "Acme Band" },
                        "SongTitle": { S: "PartiQL Rocks" },
                    },
                ],
                // ProjectionExpression: "ATTRIBUTE_NAME",
            },
        },
    };
    try {
        const data = await ddbClient.send(new BatchGetItemCommand(params));
        console.log(command + " Success, items retrieved", data);
        return data;
    } catch (err) {
        console.log(command + " Error", err);
    }
};

export const query = async () => {
    const command = "QueryCommand";
    try {
        const data = await ddbDocClient.send(new QueryCommand({
            TableName: "Music",
            KeyConditionExpression: "Artist = :a",
            ExpressionAttributeValues: {
                ":a": { S: "Acme Band" },
            },
        }));
        console.log(command + " Success :", data.Items);
        return data.Items;
    } catch (err) {
        console.log(command + " Error", err);
    }
};

export const putItem = async () => {
    const command = "PutItem";
    const params = {
        TableName: "Music",
        Item: {
            "Artist": "Zhao Lei",
            "SongTitle": "Cheng Du",
            "Awards": 10,
            "AlbumTitle": "Cheng Du is great",
        },
    };
    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log(command + " Success - item added or updated", data);
    } catch (err) {
        console.log(command + "Error", err);
    }
};

export const updateItem = async () => {
    // Set the parameters.
    const params = {
        TableName: "Music",
        Key: {
            "Artist": "Zhao Lei",
            "SongTitle": "Cheng Du",
        },
        // ProjectionExpression: "#r",
        // ExpressionAttributeNames: { "#r": "rank" },
        UpdateExpression: "set AlbumTitle = :a",
        ExpressionAttributeValues: {
            ":a": "Cheng Du is great. Updated",
        },
    };
    try {
        const data = await ddbDocClient.send(new UpdateCommand(params));
        console.log("Success - item added or updated", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};

export const deleteItem = async () => {
    // Set the parameters.
    const params = {
        TableName: "Music",
        Key: {
            "Artist": "Zhao Lei",
            "SongTitle": "Cheng Du",
        },
    };
    try {
        await ddbDocClient.send(new DeleteCommand(params));
        console.log("Success - item deleted");
    } catch (err) {
        console.log("Error", err);
    }
};

export const scanTable = async () => {
    const params = {
        TableName: "Music",
        // ProjectionExpression: "Awards, SongTitle",
        FilterExpression: "AlbumTitle = :t",
        ExpressionAttributeValues: {
          ":t": "Somewhat Famous",
        },
      };
    try {
      const data = await ddbDocClient.send(new ScanCommand(params));
      console.log("ScanTable success", data.Items);
    } catch (err) {
      console.log("Error", err);
    }
};


listTable();

getItem();

batchGetItem();

query();

putItem();

updateItem();

deleteItem();

scanTable();