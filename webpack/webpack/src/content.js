function Content() {
    var dom = document.getElementById('root');

    var content = document.createElement('div');
    content.innerText = 'Content';
    dom.append(content);
}

// ES module
// export default Content;

// CommonJS
module.exports = Content;