const r=document.getElementById("task-field"),u=document.querySelector(".tasks__list"),k=document.getElementById("remaining-items");document.querySelector(".master-container");const m=document.querySelector(".btn-theme-switcher"),h=document.getElementById("all"),v=document.getElementById("completed"),f=document.getElementById("active"),L=document.getElementById("clear");let o=[],n="light";r.addEventListener("keydown",d=>{d.key==="Enter"&&(d.preventDefault(),e.handleTask())});class e{constructor(s,c,t=!1){this.id=s,this.description=c,this.status=t}static handleTask(){let s=Date.now()+Math.floor(Math.random());const c=new e(s,r.value.trim());o.push(c),r.value="",e.addTasks()}static renderTasks(s){u.innerHTML="";const c=s.map(t=>`
      <div class="tasks__item-block">
                  <div class="tasks__inner-item-block ${n}">
                    <div class="tasks__left-block-content ${n}" data-id="${t.id}">
                      <input type="checkbox" id="${t.id}" class="tasks__checkbox" ${t.status?"checked":""}>
                      <label class="tasks__text truncate ${n}" for="${t.id}">
                        ${t.description}
                      </label>
                    </div>
                    <button class="tasks__btn-delete"></button>
                  </div>
                </div>
      `).join("");u.innerHTML+=c}static addTasks(){e.renderTasks(o),e.setLocalStorage(),e.updateCounter()}static showCompleted(s){e.renderTasks(s)}static showActive(s){e.renderTasks(s)}static setLocalStorage(){localStorage.setItem("allTasks",JSON.stringify(o)),console.log("data stored")}static getLocalStorage(){const s=JSON.parse(localStorage.getItem("allTasks"));s&&(o=[...s],console.log(`${s.length} tasks retrieved`))}static updateCounter(){const s=o.filter(c=>c.status===!1);k.innerText=s.length>1||s.length===0?`${s.length} items left`:`${s.length} item left`}static addActiveColor(s){document.querySelectorAll(".sorting-bar-mobile__button").forEach(t=>{t.classList.contains("active")&&t.classList.remove("active"),s.classList.add("active")})}}document.addEventListener("DOMContentLoaded",()=>{n=localStorage.getItem("theme")||"light",document.querySelectorAll("*").forEach(t=>{(t.classList.contains("light")||t.classList.contains("dark"))&&(t.classList.remove("light","dark"),t.classList.add(n))}),e.getLocalStorage(),e.addTasks(),e.updateCounter(),u.addEventListener("click",t=>{if(t.target.closest(".tasks__left-block-content")){const l=t.target.closest(".tasks__left-block-content").getAttribute("data-id"),i=o.find(g=>g.id.toString()===l);i&&(i.status=!i.status,e.setLocalStorage(),e.updateCounter(),e.addTasks())}if(t.target.classList.contains("tasks__btn-delete")){const a=t.target.closest(".tasks__inner-item-block").querySelector(".tasks__left-block-content").getAttribute("data-id");o=o.filter(l=>l.id.toString()!==a),e.setLocalStorage(),e.updateCounter(),e.addTasks()}});function c(){n=n==="light"?"dark":"light",document.querySelectorAll("*").forEach(a=>{a.classList.length>0&&a.classList.forEach(l=>{l==="light"?(a.classList.remove("light"),a.classList.add("dark")):l==="dark"&&(a.classList.remove("dark"),a.classList.add("light"))})}),localStorage.setItem("theme",n)}m.addEventListener("click",c),v.addEventListener("click",t=>{const a=t.target,l=o.filter(i=>i.status===!0);e.showCompleted(l),e.addActiveColor(a)}),h.addEventListener("click",t=>{const a=t.target;e.addTasks(),e.addActiveColor(a),console.log("show all tasks")}),f.addEventListener("click",t=>{const a=t.target,l=o.filter(i=>i.status===!1);e.showActive(l),e.addActiveColor(a)}),L.addEventListener("click",()=>{o=o.filter(t=>!t.status),e.setLocalStorage(),e.updateCounter(),e.addTasks()})});
