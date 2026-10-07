// tests/e2e-suite.mjs
// Master E2E Test Suite Runner for HITech MMO Landing Page
// Executes Tier 1, Tier 2, Tier 3, Tier 4, and Production Bundle Build Verification

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { stats, setTier, assert, ROOT_DIR } from './test-utils.mjs';
import { runTier1Tests } from './tier1-features.mjs';
import { runTier2Tests } from './tier2-boundaries.mjs';
import { runTier3Tests } from './tier3-pairwise.mjs';
import { runTier4Tests } from './tier4-scenarios.mjs';

async function runProductionBuildVerification() {
  setTier('tier1');
  console.log('\n\x1b[1m=== Running Production Bundle Build Verification ===\x1b[0m\n');

  console.log('Executing: npm run build...');
  const startTime = Date.now();
  let buildOutput = '';
  let buildSuccess = false;

  try {
    buildOutput = execSync('npm run build', {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    buildSuccess = true;
  } catch (error) {
    buildSuccess = false;
    buildOutput = error.stdout?.toString() + '\n' + error.stderr?.toString();
    console.error('Build execution failed:\n', buildOutput);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`Build completed in ${duration}s (Exit code: ${buildSuccess ? 0 : 1})`);

  // Assertions for build artifact verification
  assert(buildSuccess, `Production build completed with exit code 0 in ${duration}s`, { duration });

  const distDir = path.resolve(ROOT_DIR, 'dist');
  assert(fs.existsSync(distDir), 'Build artifact output directory dist/ exists');

  const distIndexHtml = path.resolve(distDir, 'index.html');
  assert(
    fs.existsSync(distIndexHtml) && fs.statSync(distIndexHtml).size > 200,
    'dist/index.html generated with non-trivial size'
  );

  const assetsDir = path.resolve(distDir, 'assets');
  assert(fs.existsSync(assetsDir), 'dist/assets directory exists');

  let jsFiles = [];
  let cssFiles = [];
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    jsFiles = files.filter((f) => f.endsWith('.js'));
    cssFiles = files.filter((f) => f.endsWith('.css'));
  }

  assert(jsFiles.length > 0, `Compiled JavaScript bundle exists (${jsFiles.join(', ')})`);
  assert(cssFiles.length > 0, `Compiled CSS stylesheet bundle exists (${cssFiles.join(', ')})`);

  const distLogo = path.resolve(distDir, 'logo.png');
  assert(
    fs.existsSync(distLogo) && fs.statSync(distLogo).size > 100000,
    'Brand logo asset (logo.png) successfully preserved in dist/ build directory'
  );
}

async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('   \x1b[1;32mHITECH MMO LANDING PAGE — AUTOMATED E2E TEST SUITE\x1b[0m');
  console.log('='.repeat(70));

  const startTime = Date.now();

  try {
    await runTier1Tests();
    await runTier2Tests();
    await runTier3Tests();
    await runTier4Tests();
    await runProductionBuildVerification();
  } catch (err) {
    console.error('\x1b[31mUnexpected Test Runner Error:\x1b[0m', err);
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const totalAssertions =
    stats.tier1.total + stats.tier2.total + stats.tier3.total + stats.tier4.total;
  const totalPassed =
    stats.tier1.passed + stats.tier2.passed + stats.tier3.passed + stats.tier4.passed;
  const totalFailed =
    stats.tier1.failed + stats.tier2.failed + stats.tier3.failed + stats.tier4.failed;

  console.log('\n' + '='.repeat(70));
  console.log('   \x1b[1mTEST SUITE EXECUTION SUMMARY\x1b[0m');
  console.log('='.repeat(70));
  console.log(` Tier 1 (Feature Conformance)   : ${stats.tier1.passed}/${stats.tier1.total} passed`);
  console.log(` Tier 2 (Boundaries & Schemas)  : ${stats.tier2.passed}/${stats.tier2.total} passed`);
  console.log(` Tier 3 (Pairwise Integrations) : ${stats.tier3.passed}/${stats.tier3.total} passed`);
  console.log(` Tier 4 (Real-World Workflows)  : ${stats.tier4.passed}/${stats.tier4.total} passed`);
  console.log('-'.repeat(70));
  console.log(` Total Assertions Evaluated     : ${totalAssertions}`);
  console.log(` Total Passed                   : \x1b[32m${totalPassed}\x1b[0m`);
  console.log(` Total Failed                   : ${totalFailed > 0 ? `\x1b[31m${totalFailed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
  console.log(` Execution Time                 : ${totalTime}s`);
  console.log('='.repeat(70) + '\n');

  if (totalFailed > 0) {
    console.error(`\x1b[31mFAILURE:\x1b[0m ${totalFailed} assertions failed.`);
    process.exit(1);
  } else {
    console.log('\x1b[32mSUCCESS:\x1b[0m All tests passed successfully! Exit code 0.');
    process.exit(0);
  }
}

main();
