const NAV = [
  {title:'HOME', items:[{title:'Overview', href:'/index.html'},{title:"What's New", href:'/pages/whats-new.html'},{title:'Release Notes', href:'/pages/release-notes.html'}]},
  {title:'GETTING STARTED', items:[{title:'Introduction', href:'/pages/getting-started.html'},{title:'Quick Start', href:'/pages/quick-start.html'},{title:'Setup by Compute Type', href:'/pages/setup-by-compute.html'},{title:'Setup by Language', href:'/pages/setup-by-language.html'}]},
  {title:'CONCEPTS & FUNDAMENTALS', items:[{title:'Core Concepts', href:'/pages/concepts.html'},{title:'Instrumentation', href:'/pages/instrumentation.html'},{title:'Data Model', href:'/pages/data-model.html'}]},
  {title:'IMPLEMENTATION GUIDES', items:[{title:'Instrumentation', href:'/pages/implementation.html'},{title:'Language-Specific Guides', href:'/pages/language-guides.html'},{title:'Service Integration', href:'/pages/service-integration.html'}]},
  {title:'FEATURES & CAPABILITIES', items:[{title:'Distributed Tracing', href:'/pages/features.html'},{title:'Service Map', href:'/pages/service-map.html'},{title:'Performance Analytics', href:'/pages/performance-analytics.html'}]},
  {title:'EXAMPLES & CODE SAMPLES', items:[{title:'Examples', href:'/pages/examples.html'},{title:'Code Snippets', href:'/pages/code-samples.html'}]},
  {title:'API REFERENCE', items:[{title:'REST APIs', href:'/pages/api.html'},{title:'SDK Reference', href:'/pages/sdk-reference.html'}]},
  {title:'BEST PRACTICES', items:[{title:'Instrumentation Best Practices', href:'/pages/best-practices.html'},{title:'Sampling Strategies', href:'/pages/sampling.html'}]},
  {title:'TROUBLESHOOTING', items:[{title:'Common Issues', href:'/pages/troubleshooting.html'},{title:'Debugging Guides', href:'/pages/debugging.html'}]},
  {title:'SECURITY & COMPLIANCE', items:[{title:'Security', href:'/pages/security.html'},{title:'Data Privacy', href:'/pages/data-privacy.html'}]},
  {title:'INTEGRATIONS', items:[{title:'AWS Services', href:'/pages/integrations.html'},{title:'Third-Party', href:'/pages/third-party.html'}]},
  {title:'REFERENCE', items:[{title:'Service Limits', href:'/pages/reference.html'},{title:'Glossary', href:'/pages/glossary.html'}]}
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
