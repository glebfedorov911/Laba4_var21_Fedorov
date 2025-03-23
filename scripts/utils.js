

export function redirect() {
    let answers = JSON.parse(localStorage.getItem('answers')) || {};
    let questions = JSON.parse(localStorage.getItem('questions'));
    localStorage.clear();
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('questions', JSON.stringify(questions));
    window.location.replace("final.html");
}