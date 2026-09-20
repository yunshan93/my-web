/* ---------- 密码验证 ---------- */
var CORRECT_PW = '185'; // 改成你们的班号

function checkPw() {
  var input = document.getElementById('pw-input');
  var tip = document.getElementById('pw-tip');
  var val = input.value.trim();

  if (val === CORRECT_PW) {
    tip.textContent = '验证通过，正在进入...';
    tip.className = 'small ok';
    setTimeout(function () {
      document.getElementById('lock-screen').classList.add('hide');
    }, 500);
  } else {
    tip.textContent = '班号不对，再想想。';
    tip.className = 'small err';
    input.value = '';
    input.focus();
  }
}
window.checkPw = checkPw;

// 回车直接验证
document.getElementById('pw-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') checkPw();
});

/* ---------- 加载动画 ---------- */
window.addEventListener('load', function () {
  var lines = [
    '正在连接友情数据库...',
    '检测到最佳损友信号...',
    '身份确认：高中同学 / 嘴欠但可靠',
    '权限通过。欢迎进入。'
  ];
  var i = 0;
  var loaderText = document.getElementById('loader-text');
  var loader = document.getElementById('loader');
  var timer = setInterval(function () {
    if (i < lines.length) {
      loaderText.textContent = lines[i];
      i++;
    } else {
      clearInterval(timer);
      loader.classList.add('hide');
      setTimeout(function () { loader.style.display = 'none'; }, 700);
    }
  }, 750);
});

/* ---------- 认识天数：改成你们认识那天 ---------- */
var startDate = new Date('2019-09-01');
var days = Math.floor((new Date() - startDate) / 86400000);
document.getElementById('days').textContent = days > 0 ? days : 1;

/* ---------- 随机语录 ---------- */
var quotes = [
  '你负责搞笑，我负责记录，我们都有光明的未来。',
  '高中三年，我最大的收获不是知识，是你这个 bug。',
  '别人碰卡是付款，你碰卡是碰我。',
  '如果以后混得不好，记得找我，我也好不到哪去。',
  '我们不是天天联系的人，但一定是碰一下就能找到的人。',
  '你欠我的饭，可以分期，但利息是下次见面。',
  '谢谢你在我最中二的时候，没把我当傻子。',
  '以后不管去哪，别把自己弄丢了。丢了就碰一下这张卡。',
  '系统提示：本损友已绑定，无法卸载。',
  '你是我高中里最不后悔的意外。'
];
function randomQuote() {
  var q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote-text').textContent = q;
}
window.randomQuote = randomQuote;

/* ---------- 翻页逻辑 ---------- */
var pages = document.querySelectorAll('.page');
var dotsWrap = document.getElementById('dots');
var current = 0;

// 生成进度点
pages.forEach(function (_, i) {
  var d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' on' : '');
  dotsWrap.appendChild(d);
});
var dots = dotsWrap.querySelectorAll('.dot');

function updateUI() {
  pages.forEach(function (p, i) {
    p.classList.toggle('active', i === current);
  });
  dots.forEach(function (d, i) {
    d.classList.toggle('on', i === current);
  });
  document.getElementById('prevBtn').style.visibility = current === 0 ? 'hidden' : 'visible';
  document.getElementById('nextBtn').textContent =
    current === pages.length - 1 ? '到底了' : '下一页';
  document.getElementById('nextBtn').style.opacity =
    current === pages.length - 1 ? '.5' : '1';
}

function go(step) {
  var next = current + step;
  if (next < 0 || next >= pages.length) return;
  current = next;
  updateUI();
}
window.go = go;

/* ---------- 彩蛋 ---------- */
function toggleEgg() {
  document.getElementById('easter-egg').classList.toggle('hidden');
}
window.toggleEgg = toggleEgg;

/* ---------- 上下滑动翻页 ---------- */
var startY = null;
document.addEventListener('touchstart', function (e) {
  startY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', function (e) {
  if (startY === null) return;
  var endY = e.changedTouches[0].clientY;
  var diff = startY - endY;
  var activePage = pages[current];

  var canScroll = activePage.scrollHeight > activePage.clientHeight;
  var atTop = activePage.scrollTop <= 0;
  var atBottom = activePage.scrollTop + activePage.clientHeight >= activePage.scrollHeight - 2;

  if (Math.abs(diff) > 60) {
    if (diff > 0 && (!canScroll || atBottom)) {
      go(1);
    } else if (diff < 0 && (!canScroll || atTop)) {
      go(-1);
    }
  }
  startY = null;
}, { passive: true });

/* ---------- 键盘左右键（电脑测试用） ---------- */
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(-1);
});

updateUI();
