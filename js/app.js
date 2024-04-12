if('serviceWorker' in navigator) {
    navigator
        .serviceWorker
        .register('/service-worker.js').then(registration => {
            console.log('Service worker registration succeeded:' , registration);
        }).catch(err => {
            console.log('Service worker registration failed:' , err);
        })
}

let installPromptEvent;

window.addEventListener('beforeinstallprompt' , (e) => {
    e.preventDefault();
    console.log('before install prompt event')
    installPromptEvent = e;
});

document.querySelector('.install-app').addEventListener('click' , (e) => {
    e.preventDefault();
    console.log(installPromptEvent);
    if(installPromptEvent) {
        installPromptEvent.prompt();

        installPromptEvent.userChoice
            .then((choiceResult) => {
                if(choiceResult.outcome === 'accepted') {
                    console.log('User Accepted');
                } else {
                    console.log('User dismissed');
                }

                installPromptEvent = null;
            })
    }
})