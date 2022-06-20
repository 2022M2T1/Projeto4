

const validate = (inputs) => {
    let error = false;

    inputs.each(function (index) {

        if (inputs[index].value == "") {
            $(this).css("border", "1px solid red");
            error = true;
        }
    });

    return error;
};

const createJob = () => {
    const form = {
        type: $('#jobType').val(),
        workModel: $('#jobModel').val(),
        area: $('#jobArea').val(),
        skills: $('#hardSkills').val().concat($('#softSkills').val())
    }

    $.ajax({
        url: '/job/create',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(form),
        success: function (res) {
            window.location.replace('/views/jobs/jobs.html')
        },
        error: function (err) {
            console.log(err)
        },
    })
}

// Função executada quando a página é carregada
$(document).ready(() => {
    // Permitir a busca e a seleção múltipla do select
    $('.skillSelect').select2({
        allowClear: true,
    })

    $.ajax({
        url: '/skills',
        type: 'GET',
        contentType: 'application/json',
        success: function (res) {
            let hardSkillOptions = ''
            let softSkillOptions = ''
            for (skill of res) {
                if (skill.type == 0) {
                    hardSkillOptions += `<option value="${skill.id}">${skill.name}</option>`
                } else {
                    softSkillOptions += `<option value="${skill.id}">${skill.name}</option>`
                }
            }

            $('#hardSkills').html(hardSkillOptions)
            $('#softSkills').html(softSkillOptions)
        },
        error: function (err) {
            console.log(err)
        },
    })

    $('#createJobButton').click(() => {
        let inputs = $("#jobType, #jobModel, #jobArea, #hardSkills, #softSkills");

        if (validate(inputs) == true) {
            return;
        }

        createJob()
    })
})

