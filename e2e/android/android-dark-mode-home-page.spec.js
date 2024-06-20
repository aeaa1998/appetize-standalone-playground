import AppetizePlaywright from '@appetize/playwright'
import { writeBuffer } from "./../utils/files.js"
import { FeedViewPage } from "@/libs/pages/android"

const { test, expect } = AppetizePlaywright

test.use({
    config: {
        // Use dark mode for the test
        appearance: 'dark'
    },
});

// Reinstall app after each test to reset data
test.afterEach(async ({ session }) => {
    await session.reinstallApp()
})

test('[Android] Set to dark mode and should return screenshot of homepage', async ({ session, config }, testInfo) => {
    const feedViewPage = new FeedViewPage(session)
    // Wait for the feed view to be visible in the emulator
    await feedViewPage.isDisplayed()
    
    // Wait for the animations to finish
    await session.waitForAnimations()
    
    const screenshot = await session.screenshot('buffer')
    expect(screenshot.data).toMatchSnapshot({
        name: 'homepage.png',
        maxDiffPixelRatio: 0.02 // Allow 2% of the pixels to be different
    });
    
    // const file = testInfo.outputPath(`screenshots/${config.device}`, 'homepage-dark-mode.png');
    // await writeBuffer(file, screenshot.data);

})