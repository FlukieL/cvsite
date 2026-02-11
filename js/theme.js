(function () {
    function getTheme() {
        try {
            const stored = localStorage.getItem('preferred-theme');
            if (stored) return stored;

            const hours = new Date().getHours();
            return (hours >= 18 || hours < 6) ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    }

    const theme = getTheme();
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
    }
})();
