// V5 模态框控制
function showV5Modal() {
    document.getElementById('v5-modal').classList.add('active');
}

function closeV5Modal() {
    document.getElementById('v5-modal').classList.remove('active');
}

// 点击模态框外部关闭
document.getElementById('v5-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeV5Modal();
    }
});

// 平台检测
function detectPlatform() {
    const ua = navigator.userAgent.toLowerCase();
    let platform = 'unknown';
    let icon = 'fa-desktop';
    let name = '未知平台';

    if (ua.includes('win')) {
        platform = 'win';
        icon = 'fa-windows';
        name = 'Windows';
    } else if (ua.includes('mac') && !ua.includes('iphone') && !ua.includes('ipad')) {
        platform = 'mac';
        icon = 'fa-apple';
        name = 'macOS';
    } else if (ua.includes('linux') && !ua.includes('android')) {
        platform = 'linux';
        icon = 'fa-linux';
        name = 'Linux';
    } else if (ua.includes('android')) {
        platform = 'android';
        icon = 'fa-android';
        name = 'Android';
    } else if (ua.includes('iphone') || ua.includes('ipad')) {
        platform = 'ios';
        icon = 'fa-apple';
        name = 'iOS';
    }

    return { platform, icon, name };
}

const currentPlatform = detectPlatform();

// 更新平台徽章（仅当在下载页时存在）
const platformBadge = document.getElementById('platform-badge');
if (platformBadge) {
    platformBadge.innerHTML = `<i class="fab ${currentPlatform.icon}"></i><span>检测到您的平台：${currentPlatform.name}</span>`;
}

// 高亮当前平台标签（仅当在下载页时）
document.querySelectorAll('.platform-tag').forEach(tag => {
    if (tag.dataset.platform === currentPlatform.platform) {
        tag.classList.add('supported');
    }
});

// 展开/收起功能（仅当在下载页时）
document.querySelectorAll('.item-header').forEach(header => {
    header.addEventListener('click', function(e) {
        if (e.target.closest('.main-download-btn')) return;
        const item = this.parentElement;
        item.classList.toggle('expanded');
    });
});

// 显示所有发行版切换（仅当在下载页时）
const showAllCheckbox = document.getElementById('show-all');
const downloadItems = document.querySelectorAll('.download-item');
const visibleCountSpan = document.getElementById('visible-count');

function updateVisibility() {
    let visibleCount = 0;

    downloadItems.forEach(item => {
        const platforms = item.dataset.platforms.split(',');
        const isObsolete = item.dataset.obsolete === 'true';

        if (showAllCheckbox && showAllCheckbox.checked) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            if (platforms.includes(currentPlatform.platform) && !isObsolete) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        }
    });

    if (visibleCountSpan) {
        visibleCountSpan.textContent = visibleCount;
    }
}

if (showAllCheckbox) {
    showAllCheckbox.addEventListener('change', updateVisibility);
    updateVisibility();
}

// 顶部信息条悬停效果（仅当在首页时）
const infoBar = document.querySelector('.info-bar');
if (infoBar) {
    infoBar.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    infoBar.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}