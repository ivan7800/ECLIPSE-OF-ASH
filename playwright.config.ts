import { defineConfig, devices } from '@playwright/test';
const port=Number(process.env.ECLIPSE_TEST_PORT??4173);
const url='http://127.0.0.1:'+port+'/ECLIPSE-OF-ASH-404/';
export default defineConfig({
  testDir:'tests',testMatch:'*.spec.ts',timeout:45000,workers:1,
  use:{baseURL:url,trace:'retain-on-failure',...devices['Desktop Chrome'],
    launchOptions:{executablePath:process.env.ECLIPSE_CHROMIUM,
      args:['--no-sandbox','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']}},
  webServer:{command:'node scripts/serve-build.mjs',url,reuseExistingServer:!process.env.CI}
});
