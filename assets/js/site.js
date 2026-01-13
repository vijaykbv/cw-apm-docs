const NAV = [
  {title:'HOME', items:[{title:'Overview', href:'index.html'},{title:"What's New", href:'pages/whats-new.html'},{title:'Release Notes', href:'pages/release-notes.html'}]},
  {title:'GETTING STARTED', items:[{title:'Introduction', href:'pages/getting-started.html'},{title:'Quick Start', href:'pages/quick-start.html'},{title:'Setup by Compute Type', href:'pages/setup-by-compute.html'},{title:'Setup by Language', href:'pages/setup-by-language.html'}]},
  {title:'CONCEPTS & FUNDAMENTALS', items:[{title:'Core Concepts', href:'pages/concepts.html'},{title:'Instrumentation', href:'pages/instrumentation.html'},{title:'Data Model', href:'pages/data-model.html'}]},
  {title:'IMPLEMENTATION GUIDES', items:[{title:'Instrumentation', href:'pages/implementation.html'},{title:'Language-Specific Guides', href:'pages/language-guides.html'},{title:'Service Integration', href:'pages/service-integration.html'}]},
  {title:'FEATURES & CAPABILITIES', items:[{title:'Distributed Tracing', href:'pages/features.html'},{title:'Service Map', href:'pages/service-map.html'},{title:'Performance Analytics', href:'pages/performance-analytics.html'}]},
  {title:'EXAMPLES & CODE SAMPLES', items:[{title:'Examples', href:'pages/examples.html'},{title:'Code Snippets', href:'pages/code-samples.html'}]},
  {title:'API REFERENCE', items:[{title:'REST APIs', href:'pages/api.html'},{title:'SDK Reference', href:'pages/sdk-reference.html'}]},
  {title:'BEST PRACTICES', items:[{title:'Instrumentation Best Practices', href:'pages/best-practices.html'},{title:'Sampling Strategies', href:'pages/sampling.html'}]},
  {title:'TROUBLESHOOTING', items:[{title:'Common Issues', href:'pages/troubleshooting.html'},{title:'Debugging Guides', href:'pages/debugging.html'}]},
  {title:'SECURITY & COMPLIANCE', items:[{title:'Security', href:'pages/security.html'},{title:'Data Privacy', href:'pages/data-privacy.html'}]},
  {title:'INTEGRATIONS', items:[{title:'AWS Services', href:'pages/integrations.html'},{title:'Third-Party', href:'pages/third-party.html'}]},
  {title:'REFERENCE', items:[{title:'Service Limits', href:'pages/reference.html'},{title:'Glossary', href:'pages/glossary.html'}]}
];

function buildNav(){
  const container=document.getElementById('left-nav');
  NAV.forEach(group=>{
    const g=document.createElement('div');g.className='nav-group';
    const h=document.createElement('h3');h.textContent=group.title;g.appendChild(h);
    group.items.forEach(it=>{
      const a=document.createElement('a');a.className='nav-item nav-sub';a.href=it.href;a.textContent=it.title;
      a.addEventListener('click',e=>{ /* let link navigate normally */ });
      g.appendChild(a);
    });
    container.appendChild(g);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  buildNav();
});

// Inject feedback form into pages (bottom-right) and handle submit
function injectFeedbackForm(){
  const container=document.querySelector('main') || document.body;
  const wrapper=document.createElement('div');
  wrapper.className='feedback-wrapper';
  wrapper.innerHTML=`
    <div class="feedback-box">
      <label for="feedback-input"><strong>Give feedback (max 200 chars)</strong></label>
      <textarea id="feedback-input" maxlength="200" rows="3" placeholder="Enter feedback..."></textarea>
      <div class="feedback-actions">
        <button id="feedback-submit">Submit Feedback</button>
        <span id="feedback-status" style="margin-left:8px"></span>
      </div>
      <div class="pat-help">
        <details>
          <summary>How to create a GitHub Personal Access Token (PAT)</summary>
          <ol>
            <li>Open <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">GitHub Personal Access Tokens</a>.</li>
            <li>Click <em>Generate new token</em> (classic or fine-grained), set an expiry.</li>
            <li>Give the token the <code>repo</code> or repository contents scope so it can update files.</li>
            <li>Generate and copy the token — paste it into the prompt when submitting feedback.</li>
          </ol>
        </details>
      </div>
      <p class="feedback-note">Note: reviewers will be asked for a GitHub personal access token with repo write permission to append feedback to docs/Feedback.md. The token is used only for this request and not stored.</p>
    </div>
  `;
  // insert at end of main content
  container.appendChild(wrapper);

  document.getElementById('feedback-submit').addEventListener('click', async ()=>{
    const txt=document.getElementById('feedback-input').value.trim();
    const status=document.getElementById('feedback-status');
    if(!txt){ status.textContent='Please enter feedback.'; return; }
    if(txt.length>200){ status.textContent='Feedback too long.'; return; }

    const token=prompt('To submit feedback, please paste a GitHub Personal Access Token (repo:contents write access). The token will not be stored.');
    if(!token){ status.textContent='Submission cancelled.'; return; }

    status.textContent='Submitting...';
    try{
      const owner='vijaykbv';
      const repo='cw-apm-docs';
      const path='docs/Feedback.md';
      const apiBase=`https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

      // fetch existing file
      let res=await fetch(apiBase,{headers:{Authorization:'token '+token,'Accept':'application/vnd.github.v3+json'}});
      let sha=null, existing='';
      if(res.status===200){
        const j=await res.json();
        sha=j.sha; existing=atob(j.content.replace(/\n/g,'')).toString();
      } else if(res.status===404){
        existing=''; sha=null;
      } else {
        throw new Error('Unable to read Feedback file: '+res.status);
      }

      const when=new Date().toISOString();
      const page=location.pathname + location.search;
      const entry=`\n- [${when}] (${page}) ${txt}`;
      const newContent=(existing + entry).replace(/^\s+/,'');
      const b64= btoa(unescape(encodeURIComponent(newContent)));

      const body={
        message:`Add feedback from page ${page}`,
        content: b64,
        branch: 'main'
      };
      if(sha) body.sha=sha;

      res=await fetch(apiBase,{
        method:'PUT',
        headers:{Authorization:'token '+token,'Accept':'application/vnd.github.v3+json','Content-Type':'application/json'},
        body: JSON.stringify(body)
      });
      if(!res.ok) throw new Error('GitHub API error: '+res.status);
      status.textContent='Thanks — feedback submitted.';
      document.getElementById('feedback-input').value='';
    }catch(err){
      console.error(err);
      status.textContent='Error: '+err.message;
    }
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  injectFeedbackForm();
});

