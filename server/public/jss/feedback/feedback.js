const appendFeedback = feedback => {
    let feed = $(`<div class="feedback-item item-list media-list">
                    <div class="feedback-item media">
                      <div class="feedback-info media-body">
                        <div class="feedback-head">
                          <div class="feedback-title">${feedback.title}</div>
                          <small>${feedback.name}</small>
                        </div>
                        <div class="feedback-message">${feedback.message}</div>
                      </div>
                    </div>
                  </div>`)
    $('.feedback-items').append(feed);
}
const updateContainer = async () => {
    try {
        const response = await axios.get('./api/feedbacks');
        response['data'].forEach(appendFeedback)
    } catch (e) {
        console.log(e)
    }

}

const clearForm = () => {
    $(`#feedback-form-name`).val('');
    $(`#feedback-form-email`).val('');
    $(`#feedback-form-title`).val('');
    $(`#feedback-form-message`).val('');
}

$(() => {
    updateContainer();
    const socket = io('http://localhost:3000/feedback', { secure: true });
    socket.on('connect', () => {
        console.log('connected');
    })

    socket.on('message', result => {
        appendFeedback(result);
        clearForm();
    });
    const form = $('#feedback-form').on({
        submit: event => {
            event.preventDefault();
            const fullname = $(`#feedback-form-name`).val();
            const email = $(`#feedback-form-email`).val();
            const title = $(`#feedback-form-title`).val();
            const message = $(`#feedback-form-message`).val();
            const feedback = {};
            feedback['name'] = fullname;
            feedback['email'] = email;
            feedback['title'] = title;
            feedback['message'] = message;
            socket.emit('add-feedback', feedback);
        }
    })

})