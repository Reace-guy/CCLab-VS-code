const tab = document.querySelectorAll('[data-tab-target')

tab.array.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector
            (tab.dataset.tabTarget)
        target.classList.add('active')
    })
})