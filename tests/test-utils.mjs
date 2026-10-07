// tests/test-utils.mjs
// Test Runner Utilities & Assertion Engine for HITech MMO E2E Test Suite

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT_DIR = path.resolve(__dirname, '..');

export const stats = {
  tier1: { total: 0, passed: 0, failed: 0 },
  tier2: { total: 0, passed: 0, failed: 0 },
  tier3: { total: 0, passed: 0, failed: 0 },
  tier4: { total: 0, passed: 0, failed: 0 },
  failures: [],
  currentTier: 'tier1',
};

export function setTier(tier) {
  stats.currentTier = tier;
}

export function assert(condition, message, metadata = {}) {
  const current = stats[stats.currentTier];
  current.total++;

  if (condition) {
    current.passed++;
    return true;
  } else {
    current.failed++;
    const failureRecord = {
      tier: stats.currentTier,
      message,
      metadata,
      stack: new Error().stack,
    };
    stats.failures.push(failureRecord);
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${message}`);
    return false;
  }
}

export function fileExists(relPath) {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  return fs.existsSync(fullPath);
}

export function readFileSafe(relPath) {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) return '';
  return fs.readFileSync(fullPath, 'utf-8');
}

export function readBufferSafe(relPath) {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath);
}

export function readJsonSafe(relPath) {
  const content = readFileSafe(relPath);
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function assertContains(content, substringOrRegex, message) {
  let matched = false;
  if (substringOrRegex instanceof RegExp) {
    matched = substringOrRegex.test(content);
  } else {
    matched = content.includes(substringOrRegex);
  }
  return assert(matched, message, { expected: String(substringOrRegex) });
}

export function assertFileExists(relPath, message) {
  return assert(fileExists(relPath), message || `File exists: ${relPath}`, { relPath });
}

export function assertFileMinSize(relPath, minBytes, message) {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    return assert(false, message || `File exists and >= ${minBytes} bytes: ${relPath}`, { relPath, size: 0 });
  }
  const stat = fs.statSync(fullPath);
  return assert(stat.size >= minBytes, message || `File ${relPath} size (${stat.size}B) >= ${minBytes}B`, {
    relPath,
    actualSize: stat.size,
    minBytes,
  });
}

export function assertValidPng(relPath, message) {
  const buf = readBufferSafe(relPath);
  if (!buf || buf.length < 8) {
    return assert(false, message || `Valid PNG file at ${relPath}`, { relPath, status: 'empty-or-missing' });
  }
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  const isPng =
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a;
  return assert(isPng, message || `PNG magic bytes verified for ${relPath}`, { isPng });
}
