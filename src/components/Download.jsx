import LandingNavbar from "./parts/LandingNavbar";

export default function Download() {
    return (
        <div className="download">
            <LandingNavbar isMainPage={false}/>
            <div className="download-title">
                <h1>Get Wayfare</h1>
                <h2>Download for Android and iOS</h2>
            </div>
            <div className="download-instructions-container">
                <div className="download-instructions ios">
                    <h2>Download for iOS</h2>
                    <p>Please visit this page using Safari. If you are already using Safari, feel free to skip to the next step.</p>
                    <p>At the bottom of the screen, tap the <strong>Share</strong> icon (a square with an upward arrow).</p>
                    <p>Scroll down the Share menu and tap <strong>“Add to Home Screen.”</strong></p>
                    <p>You can edit the name if you like. Tap <strong>“Add”</strong> in the upper right corner.</p>
                    <p>The app is now installed. You can now view it on your home screen.</p>
                </div>
                <div className="download-instructions android">
                    <h2>Download for Android</h2>
                    <p>The process for installing this app may vary with your phone model and current browser. We will provide a rough outline as to what to do to install this app, but note that the process may vary based on your current phone and browser.</p>
                    <p>Tap the <strong>menu icon</strong> (three dots or lines). It is usually loated in the top-right corner of the browser.</p>
                    <p>From the menu, tap <strong>“Add to Home screen”</strong> or <strong>“Install app”</strong> (the wording may vary by browser).</p>
                    <p>You can edit the app name if you like. Then tap <strong>“Add”</strong> to confirm.</p>
                    <p>The app is now installed. You can now view it on your home screen.</p>
                </div>
            </div>
        </div>
    );
}