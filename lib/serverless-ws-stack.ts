import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda-nodejs";
import * as apigateway from "@aws-cdk/aws-apigatewayv2";
import * as apigatewayIntegrations from "@aws-cdk/aws-apigatewayv2-integrations";
import * as dynamodb from "@aws-cdk/aws-dynamodb";


export class ServerlessWsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create a dynamo db table 
    const notesTable = new dynamodb.Table(this, "NotesTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    })

    // add a lambda function and refer to it in the src folder
    const putNote = new lambda.NodejsFunction(this, "PutNote", {
      entry: "src/putNote.ts",
      handler: "handler",
      environment: {
        TABLE_NAME: notesTable.tableName,
      }
    });

    // grant putnote object permissions
    notesTable.grant(putNote, "dynamodb:PutItem");


    // integrate putNote lambda function object with apigateway
    const putNoteIntegration = new apigatewayIntegrations.LambdaProxyIntegration(
      { handler: putNote }
    );

    // same for get notes 

    // add a lambda function and refer to it in the src folder
    const getNotes = new lambda.NodejsFunction(this, "GetNotes", {
      entry: "src/getNotes.ts",
      handler: "handler",
      environment: {
        TABLE_NAME: notesTable.tableName,
      }
    });

    // grant getnote scan permissions
    notesTable.grant(getNotes, "dynamodb:Scan");


    // integrate getNote lambda function object with apigateway
    const getNotesIntegration = new apigatewayIntegrations.LambdaProxyIntegration(
      { handler: getNotes }
    );

    // create an api gateway
    const httpApi = new apigateway.HttpApi(this, 'HttpApi');

    // add route to api gateway that routes post and get request to the lambda integration
    httpApi.addRoutes({
      path: "/notes",
      methods: [apigateway.HttpMethod.POST],
      integration: putNoteIntegration
    });

    httpApi.addRoutes({
      path: "/notes",
      methods: [apigateway.HttpMethod.GET],
      integration: getNotesIntegration
    });

    //  output the callable url
    new cdk.CfnOutput(this, "URL", { value: httpApi.apiEndpoint });



  }
}