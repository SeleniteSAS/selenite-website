import { z } from "zod";

const entrySchema = z.object({
  name: z.string(),
  entryType: z.string(),
  startTime: z.number(),
  duration: z.number(),
  initiatorType: z.string().optional(),
  nextHopProtocol: z.string().optional(),
  workerStart: z.number().optional(),
  redirectStart: z.number().optional(),
  redirectEnd: z.number().optional(),
  fetchStart: z.number().optional(),
  domainLookupStart: z.number().optional(),
  domainLookupEnd: z.number().optional(),
  connectStart: z.number().optional(),
  connectEnd: z.number().optional(),
  secureConnectionStart: z.number().optional(),
  requestStart: z.number().optional(),
  responseStart: z.number().optional(),
  responseEnd: z.number().optional(),
  transferSize: z.number().optional(),
  encodedBodySize: z.number().optional(),
  decodedBodySize: z.number().optional(),
  responseStatus: z.number().optional(),
  contentType: z.string().optional(),
  serverTiming: z.array(z.unknown()).optional(),
  unloadEventStart: z.number().optional(),
  unloadEventEnd: z.number().optional(),
  domInteractive: z.number().optional(),
  domContentLoadedEventStart: z.number().optional(),
  domContentLoadedEventEnd: z.number().optional(),
  domComplete: z.number().optional(),
  loadEventStart: z.number().optional(),
  loadEventEnd: z.number().optional(),
  type: z.string().optional(),
  redirectCount: z.number().optional(),
  processingStart: z.number().optional(),
  processingEnd: z.number().optional(),
  cancelable: z.boolean().optional(),
});

const metricSchema = z.object({
  name: z.string(),
  value: z.number(),
  rating: z.string(),
  delta: z.number(),
  entries: z.array(entrySchema),
  id: z.string(),
  navigationType: z.string(),
});

const metricsArraySchema = z.array(metricSchema);

export { entrySchema, metricSchema, metricsArraySchema };
