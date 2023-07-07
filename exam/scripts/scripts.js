let tab_view = document.getElementById("tabs");
let title_menu = tab_view.getElementsByClassName("title-menu")[0];
let body_sec = tab_view.getElementsByClassName("body-sec")[0];

async function getData(){
    const response = await fetch("https://lms.navaxcollege.com/exam.php");
    let data = await response.json();
    createTab(data.data.tabs);
}

getData(createTab);

function createTab(tabs){
    title_menu.innerText = "";
    body_sec.innerText = "";
    let active = 0;
    for (let tab of tabs){
        let title = document.createElement("li");
        title.innerText = tab["title"];
        if(tab["title"].length > 11) {
            title.innerText = title.innerText.substring(0, 10) + " ...";
        }
        title_menu.append(title);
        let body = document.createElement("div");
        let row = document.createElement("div");
        row.classList.add("row");
        for(let text of tab["body"]) {
            let col = document.createElement("div");
            col.classList.add("col");
            let p = document.createElement("p");
            p.innerText = text;
            col.append(p);
            row.append(col);
            body.append(row);
        }
        if(tab["is_active"] && active === 0)
        {
            active ++;
            title.classList.add("active-tab");
        }else {
            body.classList.add("hide-body")
        }
        title.onclick = ()=>{
            for(let bd of body_sec.children)
            {
                bd.classList.add("hide-body");
            }
            for(let tt of title_menu.children)
            {
                tt.classList.remove("active-tab");
            }
            body.classList.remove("hide-body");
            title.classList.add("active-tab");
        }
        body_sec.append(body);
    }
    if(active === 0 && title_menu.children.length > 0){
        title_menu.getElementsByTagName("li")[0].classList.add("active-tab");
        body_sec.getElementsByTagName("div")[0].classList.remove("hide-body");
    }
}