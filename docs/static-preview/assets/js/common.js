// 扑克游戏 - 通用 JavaScript 功能

// 通用工具函数
const GameUtils = {
    // 格式化数字（添加千分位分隔符）
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // 解析格式化的数字
    parseNumber: (str) => {
        return parseInt(str.replace(/,/g, ''));
    },

    // 生成随机ID
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    },

    // 防抖函数
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 通用动画效果
const AnimationUtils = {
    // 淡入动画
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = performance.now();
        
        function animate(time) {
            let elapsed = time - start;
            let progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },

    // 淡出动画
    fadeOut: (element, duration = 300) => {
        let start = performance.now();
        let startOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(time) {
            let elapsed = time - start;
            let progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = startOpacity * (1 - progress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    },

    // 滑动动画
    slideDown: (element, duration = 300) => {
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        let targetHeight = element.scrollHeight;
        let start = performance.now();
        
        function animate(time) {
            let elapsed = time - start;
            let progress = Math.min(elapsed / duration, 1);
            
            element.style.height = (targetHeight * progress) + 'px';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            }
        }
        
        requestAnimationFrame(animate);
    },

    // 滑动动画
    slideUp: (element, duration = 300) => {
        let startHeight = element.offsetHeight;
        let start = performance.now();
        
        element.style.overflow = 'hidden';
        
        function animate(time) {
            let elapsed = time - start;
            let progress = Math.min(elapsed / duration, 1);
            
            element.style.height = (startHeight * (1 - progress)) + 'px';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            }
        }
        
        requestAnimationFrame(animate);
    }
};

// 通用事件处理
const EventUtils = {
    // 添加点击效果
    addClickEffect: (element) => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    },

    // 添加悬停效果
    addHoverEffect: (element) => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    },

    // 键盘快捷键处理
    addKeyboardShortcuts: (shortcuts) => {
        document.addEventListener('keydown', function(e) {
            if (shortcuts[e.key]) {
                e.preventDefault();
                shortcuts[e.key]();
            }
        });
    }
};

// 通用表单验证
const FormValidation = {
    // 验证邮箱
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // 验证密码强度
    validatePassword: (password) => {
        const strength = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        const score = Object.values(strength).filter(Boolean).length;
        
        return {
            score: score,
            level: score < 2 ? 'weak' : score < 4 ? 'fair' : score < 5 ? 'good' : 'strong',
            details: strength
        };
    },

    // 验证用户名
    validateUsername: (username) => {
        return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
    },

    // 显示错误信息
    showError: (element, message) => {
        element.classList.add('error');
        const errorElement = element.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    },

    // 清除错误信息
    clearError: (element) => {
        element.classList.remove('error');
        const errorElement = element.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
};

// 通用通知系统
const NotificationSystem = {
    // 显示通知
    show: (message, type = 'info', duration = 3000) => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        
        // 根据类型设置颜色
        const colors = {
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#f44336'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, duration);
    },

    // 成功通知
    success: (message) => {
        NotificationSystem.show(message, 'success');
    },

    // 错误通知
    error: (message) => {
        NotificationSystem.show(message, 'error');
    },

    // 警告通知
    warning: (message) => {
        NotificationSystem.show(message, 'warning');
    },

    // 信息通知
    info: (message) => {
        NotificationSystem.show(message, 'info');
    }
};

// 通用加载状态管理
const LoadingManager = {
    // 显示加载状态
    show: (element, text = '加载中...') => {
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading-overlay';
        loadingElement.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">${text}</div>
        `;
        
        Object.assign(loadingElement.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000'
        });
        
        element.style.position = 'relative';
        element.appendChild(loadingElement);
    },

    // 隐藏加载状态
    hide: (element) => {
        const loadingElement = element.querySelector('.loading-overlay');
        if (loadingElement) {
            loadingElement.remove();
        }
    }
};

// 页面初始化完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加通用点击效果到所有按钮
    const buttons = document.querySelectorAll('.btn, button, .action-btn');
    buttons.forEach(button => {
        EventUtils.addClickEffect(button);
    });
    
    // 添加通用悬停效果到所有卡片
    const cards = document.querySelectorAll('.card, .component-card');
    cards.forEach(card => {
        EventUtils.addHoverEffect(card);
    });
    
    console.log('扑克游戏通用脚本已加载');
});
