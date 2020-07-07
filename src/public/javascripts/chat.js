send_button.addEventListener('click',
    ()=>{
        setTimeout(() => {
            const messa = document.querySelectorAll('#messaje')

            for (i = 0; i < messa.length; i++) {
                messa[i].style.transform = 'scale(1)'
            }

        }, 200)

    }
)