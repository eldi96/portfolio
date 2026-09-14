(function(){
  // 상단 바 배경 전환
  var topbar = document.getElementById('topbar');
  window.addEventListener('scroll', function(){
    topbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive:true });

  // 스크롤 리빌
  var reveals = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('is-visible'); }
    });
  }, { threshold:0.2 });
  reveals.forEach(function(el){ io.observe(el); });

  // 우측 점 네비게이션 + 활성 섹션 표시
  var sections = ['hero','scope','records','values','contact'].map(function(id){ return document.getElementById(id); });
  var dots = document.querySelectorAll('#dotnav button');
  dots.forEach(function(dot){
    dot.addEventListener('click', function(){
      var target = document.getElementById(dot.getAttribute('data-target'));
      if(target){ target.scrollIntoView({ behavior:'smooth' }); }
    });
  });
  var sectionIO = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = entry.target.id;
        dots.forEach(function(dot){
          dot.classList.toggle('active', dot.getAttribute('data-target') === id);
        });
      }
    });
  }, { threshold:0.55 });
  sections.forEach(function(sec){ if(sec) sectionIO.observe(sec); });

  // 기록 캐러셀
  var track = document.getElementById('recordsTrack');
  var panels = track.children.length;
  var idx = 0;
  var rcCurrent = document.getElementById('rcCurrent');
  var rcDots = document.querySelectorAll('#rcDots button');

  function render(){
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    rcCurrent.textContent = String(idx + 1).padStart(2,'0');
    rcDots.forEach(function(d,i){ d.classList.toggle('active', i === idx); });
  }
  document.getElementById('rcPrev').addEventListener('click', function(){
    idx = (idx - 1 + panels) % panels; render();
  });
  document.getElementById('rcNext').addEventListener('click', function(){
    idx = (idx + 1) % panels; render();
  });
  rcDots.forEach(function(d){
    d.addEventListener('click', function(){ idx = parseInt(d.getAttribute('data-i'),10); render(); });
  });

  // 기록 섹션에 포커스가 있을 때 좌우 화살표로도 넘기기
  document.getElementById('records').addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight'){ document.getElementById('rcNext').click(); }
    if(e.key === 'ArrowLeft'){ document.getElementById('rcPrev').click(); }
  });

  render();
})();
