# cw-apm-sample-node — 15-minute Node.js Quickstart

This sample demonstrates a minimal Node.js Express application instrumented with OpenTelemetry and configured to send traces via OTLP to a local collector. You can use this to verify end-to-end tracing before wiring data into CloudWatch Application Signals or an ADOT collector.

Quickstart (15 minutes)

1. Install dependencies

```bash
cd samples/nodejs-quickstart
npm install
```

2. Start a local OpenTelemetry Collector that receives OTLP (gRPC) and logs traces

```bash
# from samples/nodejs-quickstart
docker run --rm -p 4317:4317 -v "$PWD/otel-config.yaml":/etc/otel-config.yaml otel/opentelemetry-collector-contrib:latest --config /etc/otel-config.yaml
```

3. Start the sample app

```bash
npm start
```

4. Generate some traffic

```bash
# in another terminal
./generate_requests.sh
```

You should see trace logs printed by the collector (logging exporter). To send traces to AWS CloudWatch Application Signals, replace the collector with the AWS Distro for OpenTelemetry (ADOT) collector configured to export to CloudWatch (follow ADOT docs for configuration and IAM setup).

Notes
- The sample uses automatic Node instrumentations from OpenTelemetry to create spans for Express routes.
- The exporter endpoint defaults to grpc://localhost:4317; set `OTEL_EXPORTER_OTLP_ENDPOINT` to change it.

Links
- OpenTelemetry Node SDK: https://github.com/open-telemetry/opentelemetry-js
- ADOT Collector docs: https://aws-otel.github.io/docs

