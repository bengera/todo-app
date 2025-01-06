const l=document.getElementById("task-field"),i=document.querySelector(".tasks__list"),g=document.getElementById("remaining-items");let a=[];l.addEventListener("keydown",c=>{c.key==="Enter"&&(c.preventDefault(),e.handleTask())});class e{constructor(t,n,s=!1){this.id=t,this.description=n,this.status=s}static handleTask(){let t=Date.now()+Math.floor(Math.random());const n=new e(t,l.value.trim());a.push(n),l.value="",e.addTasks()}static addTasks(){i.innerHTML="";let t=a.map(s=>`
      <div class="tasks__item-block">
                  <div class="tasks__inner-item-block">
                    <div class="tasks__left-block-content">
                      <input type="checkbox" id="${s.id}" class="tasks__checkbox" ${s.status?"checked":""}>
                      <label class="tasks__text truncate" for="${s.id}">
                        ${s.description}
                      </label>
                    </div>
                    <button class="tasks__btn-delete"></button>
                  </div>
                </div>
      `).join("");e.setLocalStorage(),e.updateCounter(),i.innerHTML+=t,document.querySelectorAll(".tasks__checkbox").forEach(s=>{s.addEventListener("change",d=>{const r=d.target.id,o=a.find(u=>u.id.toString()===r);o.status?o.status=!1:o.status=!0,e.setLocalStorage(),e.updateCounter()})}),console.log(a)}static setLocalStorage(){localStorage.setItem("allTasks",JSON.stringify(a)),console.log("data stored")}static getLocalStorage(){const t=JSON.parse(localStorage.getItem("allTasks"));t&&(a=[...t],console.log(`${t.length} tasks retrieved`))}static updateCounter(){const t=a.filter(n=>n.status===!1);g.innerText=`${t.length} items left`}}document.addEventListener("DOMContentLoaded",()=>{e.getLocalStorage(),e.addTasks(),e.updateCounter()});
