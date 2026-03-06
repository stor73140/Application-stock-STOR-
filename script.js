const API_URL="https://script.google.com/macros/s/AKfycbz79_X96_YdtznLHBQ_H1SNjOxtmnFBo8Li-DknNec63fRroLnW34E_D6bixDiDpg19/exec"

let data=[]

async function loadData(){

let res=await fetch(API_URL)
data=await res.json()

display()

}

function display(){

let search=document.getElementById("search").value.toLowerCase()

let table=document.getElementById("table")
table.innerHTML=""

data.forEach(p=>{

if(!p.piece.toLowerCase().includes(search)) return

table.innerHTML+=`

<tr>
<td>${p.gare}</td>
<td>${p.nom}</td>

<td>
<button onclick="moins(${i})">➖</button>
${p.qte}
<button onclick="plus(${i})">➕</button>
</td>

<td>${p.dateModif} - ${p.user}</td>

<td>
<button onclick="edit(${i})">✏️</button>
<button onclick="del(${i})">🗑️</button>
</td>

</tr>
`

})

buildGeneral()

}

function buildGeneral(){

let stock={}

data.forEach(p=>{

if(!stock[p.piece]) stock[p.piece]=0
stock[p.piece]+=Number(p.qte)

})

let table=document.getElementById("generalTable")
table.innerHTML=""

Object.keys(stock).forEach(piece=>{

table.innerHTML+=`
<tr>
<td>${piece}</td>
<td>${stock[piece]}</td>
</tr>
`

})

}

async function addPiece(){

let piece=document.getElementById("pieceNom").value
let qte=document.getElementById("pieceQte").value
let gare=document.getElementById("gareSelect").value

let obj={
piece,
qte,
gare,
date:new Date().toLocaleString()
}

await fetch(API_URL,{
method:"POST",
body:JSON.stringify(obj)
})

loadData()

}

function exportExcel(){

let csv="Gare,Piece,Quantite,Date\n"

data.forEach(p=>{
csv+=`${p.gare},${p.piece},${p.qte},${p.date}\n`
})

let blob=new Blob([csv])
let a=document.createElement("a")

a.href=URL.createObjectURL(blob)
a.download="stock_rm.csv"

a.click()

}

function exportPDF(){

window.print()

}

document.getElementById("search").addEventListener("input",display)

loadData()
function plus(i){

data.pieces[i].qte++

data.pieces[i].dateModif=getDate()
data.pieces[i].user=currentUser

save()
refresh()

}

function moins(i){

if(data.pieces[i].qte>0){

data.pieces[i].qte--

data.pieces[i].dateModif=getDate()
data.pieces[i].user=currentUser

save()
refresh()

}

}
