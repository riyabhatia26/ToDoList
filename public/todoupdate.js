// let todolist = JSON.parse(localStorage.getItem('todolist')) || [];
let todolist=[];
window.onload= function() 
{   console.log('hi');

    let inp = document.getElementById('inp');
    let result = document.getElementById('result');
    let btn = document.getElementById('btn');
    let sort = document.getElementById('sort');
    var tempdata=$.get({
        url:'/json',
        async:false
    })
    console.log(tempdata);
    console.log(JSON.parse(tempdata.readyState));
    
    var data=JSON.parse(tempdata.responseText);
    if(typeof data!=undefined){
        for(var i=0;i<data.length;i++){
            var todo=data[i];
            todolist.push(todo);
        }
        display();
    }
    display();

    btn.onclick = function () 
    {
        let task = {
            item: inp.value,
            done: false
        };

        if(task.item.length<1){
            alert("Add task");
        }
        else{
            todolist.push(task);

            localStorage.setItem('todolist', JSON.stringify(todolist));
            // console.log(JSON.stringify(todolist));
            $.post('/json',{
                'key':JSON.stringify(todolist)
            },function(){

            });
            display();    
        }
    }

    sort.onclick = function()
    {

        let temparr = [];

        let sorted = " ";
        for(let i = 0; i < todolist.length; i++)
        {
            if(todolist[i].done == false)
            {

                let task = {
                    item: todolist[i].item,
                    done: false
                };
                temparr.push(task);


                sorted+=`<tr>
                    <td>
                        <input type="checkbox" id ="t${i}" class="Done" title="Done" onclick="done(this)">
                    </td>
        
                    <td>
                        <input type="text" disabled="true" size="35%" id="${i}" value="${todolist[i].item}">
                    </td>
        
                    <td>
                        <button  type="button" class="btn-outline-info up" id="t${i}" title="Move up" onclick="up(this)">
                            <i class="fas fa-level-up-alt fa-fw"></i>
                        </button>
                    </td>
        
                    <td>
                        <button  type="button" class="btn-outline-secondary down" id="t${i}" title="Move down" onclick="down(this)">
                            <i class="fas fa-level-down-alt fa-fw"></i>
                        </button>
                    </td>
        
                    <td>
                        <button type="button" class="btn-outline-danger delete" id="t${i}" title="Delete" onclick="delete1(this)">
                            <i class="fas fa-trash fa-fw"></i>
                        </button>
                    </td>
        
                </tr>`
            }
        }
        for(let i = 0; i < todolist.length; i++)
        {
            if(todolist[i].done == true)
            {
                
                let task = {
                    item: todolist[i].item,
                    done: true
                };
                temparr.push(task);

                sorted+=`<tr>
                <td>
                    <input type="checkbox" id ="t${i}" class="Done" title="Done" onclick="done(this)">
                </td>
    
                <td>
                    <input type="text" disabled="true" size="35%" id="${i}" value="${todolist[i].item}">
                </td>
    
                <td>
                    <button  type="button" class="btn-outline-info up" id="t${i}" title="Move up" onclick="up(this)">
                        <i class="fas fa-level-up-alt fa-fw"></i>
                    </button>
                </td>

                <td>
                    <button  type="button" class="btn-outline-secondary down" id="t${i}" title="Move down" onclick="down(this)">
                        <i class="fas fa-level-down-alt fa-fw"></i>
                    </button>
                </td>

                <td>
                    <button type="button" class="btn-outline-danger delete" id="t${i}" title="Delete" onclick="delete1(this)">
                        <i class="fas fa-trash fa-fw"></i>
                    </button>
                </td>

            </tr>`            
            }
        }
        // result.innerHTML = " ";
        // result.innerHTML = sorted;

        todolist = temparr;

        for (let i = 0; i < todolist.length; i++) 
        {
            let checked = todolist[i].done;
            strikeOff(checked, i);
        }

//        localStorage.setItem('todolist',JSON.stringify(todolist));
        $.post('/json',{
            'key':JSON.stringify(todolist)
        });
    
    }

    window.display=display;
};

//todolist=JSON.parse(localStorage.getItem('todolist')) || [];

function display()
{
    let list = " ";
    for (let i = 0; i < todolist.length; i++)
    {
        list+=`<tr>
            <td>
                <input type="checkbox" id ="t${i}" class="Done" title="Done" onclick="done(this)" style="zoom:2.5">
            </td>

            <td>
                <input type="text" disabled="true" size="35%" id="${i}" value="${todolist[i].item}">
            </td>

            <td>
                <button  type="button" class="btn-outline-info up" id="t${i}" title="Move up" onclick="up(this)">
                    <i class="fas fa-level-up-alt fa-fw"></i>
                </button>
            </td>

            <td>
                <button  type="button" class="btn-outline-secondary down" id="t${i}" title="Move down" onclick="down(this)">
                    <i class="fas fa-level-down-alt fa-fw"></i>
                </button>
            </td>

            <td>
                <button type="button" class="btn-outline-danger delete" id="t${i}" title="Delete" onclick="delete1(this)">
                    <i class="fas fa-trash fa-fw"></i>
                </button>
            </td>

        </tr>`
    }


    result.innerHTML = " ";
    result.innerHTML = list;
    for (let i = 0; i < todolist.length; i++) 
    {
        let checked = todolist[i].done;
        strikeOff(checked, i);
    }

    document.getElementById('inp').value = '';

    if(todolist.length){
        let noup = document.getElementsByClassName('btn-outline-info up');
        noup[0].parentElement.style.display="none";

        let nodwn = document.getElementsByClassName('btn-outline-secondary down');
        nodwn[parseInt(todolist.length)-1].parentElement.style.display="none";

    }
    
}

function up(t)
{
    let id=parseInt(t.id.substr(1));
    let swap = todolist.splice(id, 1)[0];
    todolist.splice(id-1, 0, swap);


//    localStorage.setItem('todolist',JSON.stringify(todolist));
    $.post('/json',{
        'key':JSON.stringify(todolist)
    });
    display();
}

function down(t)
{
    let id=parseInt(t.id.substr(1));
    let swap = todolist.splice(id, 1)[0];

    todolist.splice(id + 1, 0, swap);

//    localStorage.setItem('todolist',JSON.stringify(todolist));
    $.post('/json',{
        'key':JSON.stringify(todolist)
    });

    display();
}

function done(t)
{
    let id=t.id.substr(1);
    todolist[id].done=!todolist[id].done;
    let checked=todolist[id].done;
    strikeOff(checked,id);

//    localStorage.setItem('todolist',JSON.stringify(todolist));
    $.post('/json',{
        'key':JSON.stringify(todolist)
    });

}

function strikeOff(check,id)
{
    let t=document.getElementById(id);
    let c=`t${id}`;
    let checkbox=document.getElementById(c);
    if(check)
    {
        t.style.textDecoration="line-through";
        checkbox.checked=true;
    }
    else
    {   
        checkbox.checked=false;
        t.style.textDecoration="none";
    }
}

function delete1(t)
{
    var ans = window.confirm("Delete item?");
    if(ans) {
        let id = t.id.substr(1);
        todolist.splice(id, 1);

//        localStorage.setItem('todolist', JSON.stringify(todolist));
        $.post('/json',{
            'key':JSON.stringify(todolist)
        });
        display();
    }
}

function deleteCmp()
{
    var ans = window.confirm("Delete completed tasks?");
    if(ans) {
        for(let i = 0; i < todolist.length; i++)
        {
            if(todolist[i].done == true)
            {
                todolist.splice(i,1);
            }
        }

//        localStorage.setItem('todolist', JSON.stringify(todolist));
        $.post('/json',{
            'key':JSON.stringify(todolist)
        });

        display();
    }
}


/* <td>
<button type="button" class="btn-outline-warning update" id="t${i}" title="Update" onclick="update(this)" >
    <i class="fas fa-pen-square fa-fw"></i>
</button>
</td> */


// function update(t)
// {
//     let id=t.id.substr(1).toString()
//     console.log(typeof id);
    
//     var newVal=document.getElementById(id);
//     console.log(newVal);
//     document.getElementById(id).removeAttribute('disabled');
    
//     console.log(document.getElementById(id));
//     newVal=document.getElementById(id);
//     todolist[id].item=newVal.value;
//     display();
// }
