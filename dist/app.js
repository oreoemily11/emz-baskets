const form=document.querySelector('#form');
const review=document.querySelector('#review');
const today=new Date();
const localDate=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(today);
const earliest=new Date(localDate+'T12:00:00Z');
earliest.setUTCDate(earliest.getUTCDate()+3);
form.elements.due.min=earliest.toISOString().slice(0,10);
document.querySelectorAll('[data-theme]').forEach(button=>button.addEventListener('click',()=>{
  const field=form.elements.favorites;
  if(!field.value.includes(button.dataset.theme)) field.value=[field.value,button.dataset.theme].filter(Boolean).join(', ');
  form.hidden=false;review.hidden=true;location.hash='request';field.focus();
}));
form.addEventListener('submit',event=>{
  event.preventDefault();const list=review.querySelector('dl');list.replaceChildren();
  for(const [key,value] of new FormData(form)){
    const label=form.elements[key].labels[0].firstChild.textContent;
    const term=document.createElement('dt'),detail=document.createElement('dd');
    term.textContent=label;detail.textContent=value||'—';list.append(term,detail);
  }
  const message=Array.from(list.querySelectorAll('dt'),term=>term.textContent+': '+term.nextElementSibling.textContent).join('\n');
  const subject='EMZ basket request';
  document.querySelector('#send').href='mailto:orders@emzbaskets.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(message);
  const status=document.querySelector('#status');
  status.textContent='';
  document.querySelector('#copy').onclick=async()=>{
    try {await navigator.clipboard.writeText(subject+'\n\n'+message);status.textContent='Copied.';}
    catch {status.textContent='Select and copy the details above.';}
  };
  form.hidden=true;review.hidden=false;review.focus();
});
document.querySelector('#edit').addEventListener('click',()=>{review.hidden=true;form.hidden=false;form.elements.recipient.focus()});
