// FUNÇÃO QUE OBTÉM A IDADE POR MEIO DA DATA DE NASCIMENTO
function getAge(dateString) {
    var today = new Date()

    var dateParts = dateString.split('/')

    var birthDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])

    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    
    return age
}
// FUNÇÃO EXECUTADA QUANDO A PÁGINA CARREGADA
$(document).ready(() => {
    var url_string = window.location.href
    var url = new URL(url_string)
    var id = url.searchParams.get('id')

    // REQUISIÇÃO 'GET' QUE ADICIONA OS DADOS DA CANDIDATA À PÁGINA HTML
    $.ajax({
        url: '/job/getUsers/' + id,
        type: 'GET',
        contentType: 'application/json',
        success: function (user) {
            $('#title').html(user.firstName + ' ' + user.lastName)
            $('#age').html(getAge(user.birthDate) + ' anos')
            $('#location').html(user.address.city + ' / ' + user.address.state)
            $('#history').html(user.aboutYou)

            let hardSkills = ''
            let softSkills = ''

            // CHECAR SE É UMA HARDSKILL OU SOFTSKILL
            for (skill of user.skills) {
                if (skill.type == 0) {
                    hardSkills += `<span class="badge badge-yellow">${skill.name}</span>`
                } else {
                    softSkills += `<span class="badge badge-blue">${skill.name}</span>`
                }
            }

            $('#hardSkillsContainer').html(hardSkills)
            $('#softSkillsContainer').html(softSkills)

            $('#email').html(user.email)
            $('#phone').html(user.phone)
        },
        error: function (err) {
            console.log(err)
        },
    })
})
