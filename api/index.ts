import type { IncomingMessage, ServerResponse } from 'node:http';
import express from 'express';
import { app } from '../server/index';

// Vercel routes every /api/* request here. The Express app already serves the
// built Angular client and the API routes, so it handles everything directly.
export default app;