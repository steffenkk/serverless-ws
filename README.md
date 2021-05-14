#  CDK TypeScript project for a notes webservice

## How to:

- there are two lambda functions placed in the ```src/``` folder
- all stacks are described in ```lib/serverless-ws-stack.ts```
- aws account is determined by the cli/environment variables, so make sure you set them properly to any kind of playground account
- the `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `npx cdk deploy`      deploy this stack to your default AWS account/region
 * `npx cdk diff`        compare deployed stack with current state
 * `npx cdk synth`       emits the synthesized CloudFormation template

## Architecture

![](/docs/arch.png)

### API routes
- get notes: ```curl https://XXXXXX.execute-api.eu-central-1.amazonaws.com/notes```
- put notes: ```curl -X POST https://XXXXXX.execute-api.eu-central-1.amazonaws.com/notes --data '{ "title": "Hello World", "content": "abc" }' -H 'Content-Type: application/json' -i```
- wanna try out load? try ```hey -n 1000 -m GET https://XXXXXX.execute-api.eu-central-1.amazonaws.com/notes```  

## Links

- DOCS: https://fielmann-ag.github.io/serverless-workshop/#/rest-api?id=bootstrapping-aws-cdk
- AWS CDK Kickstart: https://docs.aws.amazon.com/cdk/latest/guide/hello_world.html
