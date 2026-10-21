import { test,expect } from '@playwright/test';
test('home to dashboard navigation',async({page})=>{await page.goto('/');await expect(page.getByRole('heading',{name:'DevFlow Quality Lab'})).toBeVisible();await page.getByRole('link',{name:'Dashboard'}).click();await expect(page.getByRole('heading',{name:'Task Dashboard'})).toBeVisible();});
test('health endpoint returns JSON',async({request})=>{const res=await request.get('/api/health');expect(res.ok()).toBeTruthy();expect(await res.json()).toMatchObject({ok:true});});
