function Sidebar() {
    var dom = document.getElementById('root');
    
    var sidebar = document.createElement('div');

    sidebar.innerText = 'Sidebar';

    dom.append(sidebar);
}

// export default Sidebar;


// CommonJS
module.exports = Sidebar;