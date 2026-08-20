const heroBackgrounds = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&h=900&fit=crop&q=80',
    'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1600&h=900&fit=crop&q=80'
];

let uploadedFiles = [];
let currentService = null;
let currentSlide = 0;
let slideInterval;
let paymentScreenshot = null;

const WHATSAPP_NUMBER = '201019590009';
const OWNER_EMAIL = 'Acckhalid9@gmail.com';

const IMGBB_API_KEY = '004174c7792d5ceb42d9cb6d2f6de78c'; // مفتاح محدّث

window.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
    startAutoSlide();
});

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const heroSection = document.querySelector('.hero');
    
    if (!slides.length) return;
    
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    currentSlide = index;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    if (heroSection && heroBackgrounds[currentSlide]) {
        heroSection.style.backgroundImage = `url('${heroBackgrounds[currentSlide]}')`;
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
    resetInterval();
}

function goToSlide(index) {
    showSlide(index);
    resetInterval();
}

function autoSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function startAutoSlide() {
    slideInterval = setInterval(autoSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

const servicesData = {
    accounting: {
        title: '📊 المحاسبة المالية',
        price: 2000,
        description: 'نقدم خدمات محاسبية متكاملة تشمل إعداد القوائم المالية والتقارير الدورية',
        documents: [
            'السجل التجاري للشركة',
            'عقد التأسيس أو النظام الأساسي',
            'كشوف البنك الشهرية',
            'الفواتير والمستندات المالية',
            'عقود الإيجار والمصروفات',
            'كشف الرواتب والأجور'
        ]
    },
    audit: {
        title: '💼 المراجعة والتدقيق',
        price: 3500,
        description: 'خدمات مراجعة وتدقيق شاملة للحسابات وفقاً للمعايير الدولية',
        documents: [
            'القوائم المالية للسنوات السابقة',
            'السجل التجاري',
            'محاضر اجتماعات مجلس الإدارة',
            'العقود والاتفاقيات الرئيسية',
            'كشوف البنوك',
            'تقارير المخزون',
            'مستندات الأصول الثابتة'
        ]
    },
    consulting: {
        title: '📈 الاستشارات المالية',
        price: 1500,
        description: 'استشارات مالية متخصصة لتحسين الأداء    وزيادة الربحية',
        documents: [
            'القوائم المالية الحالية',
            'خطة العمل (إن وجدت)',
            'تقارير المبيعات والمشتريات',
            'بيانات التكاليف',
            'معلومات عن السوق والمنافسين'
        ]
    },
    tax: {
        title: '🧾 الزكاة والضرائب',
        price: 1800,
        description: 'إعداد الإقرارات الضريبية والزكوية والتعامل مع الهيئات الحكومية',
        documents: [
            'السجل التجاري',
            'شهادة تسجيل ضريبة القيمة المضافة',
            'القوائم المالية',
            'كشوف البنك',
            'الفواتير والمبيعات',
            'المشتريات والمصروفات',
            'الإقرارات السابقة (إن وجدت)'
        ]
    },
    systems: {
        title: '💻 الأنظمة المحاسبية',
        price: 5000,
        description: 'تصميم وتطبيق أنظمة محاسبية إلكترونية متطورة',
        documents: [
            'وصف للعمليات المحاسبية الحالية',
            'الهيكل التنظيمي للشركة',
            'نماذج التقارير المطلوبة',
            'عدد المستخدمين المتوقع',
            'متطلبات التكامل مع أنظمة أخرى'
        ]
    },
    payroll: {
        title: '📋 الرواتب والأجور',
        price: 1200,
        description: 'إدارة شاملة لكشوف الرواتب والتأمينات الاجتماعية',
        documents: [
            'قائمة الموظفين ومعلوماتهم',
            'عقود العمل',
            'بيانات الرواتب والبدلات',
            'رقم التسجيل في التأمينات',
            'الخصومات والإضافات الشهرية'
        ]
    }
};

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page + 'Page').classList.add('active');
    window.scrollTo(0, 0);
}

function scrollToServices() {
    showPage('home');
    setTimeout(() => {
        document.getElementById('services').scrollIntoView({behavior: 'smooth'});
    }, 100);
}

function scrollToContact() {
    showPage('home');
    setTimeout(() => {
        document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
    }, 100);
}

function showServiceDetails(serviceId) {
    currentService = servicesData[serviceId];
    const content = document.getElementById('serviceContent');
    
    content.innerHTML = `
        <h2 style="color: #1e3c72; margin-bottom: 1rem;">${currentService.title}</h2>
        <p style="font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.8;">${currentService.description}</p>
        
        <div class="required-docs">
            <h3>📄 المستندات المطلوبة:</h3>
            <ul>
                ${currentService.documents.map(doc => `<li>✓ ${doc}</li>`).join('')}
            </ul>
        </div>
    `;
    
    document.getElementById('priceDisplay').textContent = currentService.price.toLocaleString() + ' ريال';
    showPage('service');
    
    uploadedFiles = [];
    paymentScreenshot = null;
    document.getElementById('uploadedFiles').innerHTML = '';
    document.getElementById('screenshotPreview').innerHTML = '';
    document.getElementById('serviceForm').reset();
    document.getElementById('submitButton').disabled = true;
    document.getElementById('successMessage').style.display = 'none';
}

document.getElementById('fileInput').addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        uploadedFiles.push(file);
        addFileToList(file);
    });
    e.target.value = '';
    checkFormValidity();
});

function addFileToList(file) {
    const fileList = document.getElementById('uploadedFiles');
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    // تحديد الأيقونة حسب نوع الملف
    let icon = '📄';
    if (file.type.startsWith('image/')) icon = '🖼️';
    else if (file.type.includes('pdf')) icon = '📕';
    else if (file.type.includes('word')) icon = '📘';
    else if (file.type.includes('excel') || file.type.includes('sheet')) icon = '📊';
    
    fileItem.innerHTML = `
        <span>${icon} ${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
        <button type="button" onclick="removeFile('${file.name}')">حذف</button>
    `;
    fileList.appendChild(fileItem);
}

function removeFile(fileName) {
    uploadedFiles = uploadedFiles.filter(f => f.name !== fileName);
    const fileItems = document.getElementById('uploadedFiles').children;
    Array.from(fileItems).forEach(item => {
        if (item.textContent.includes(fileName)) {
            item.remove();
        }
    });
    checkFormValidity();
}

document.getElementById('paymentScreenshot').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        paymentScreenshot = file;
        const preview = document.getElementById('screenshotPreview');
        preview.innerHTML = `
            <div class="file-item" style="margin-top: 1rem;">
                <span>📷 ${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
                <button type="button" onclick="removeScreenshot()">حذف</button>
            </div>
        `;
        checkFormValidity();
    }
});

function removeScreenshot() {
    paymentScreenshot = null;
    document.getElementById('paymentScreenshot').value = '';
    document.getElementById('screenshotPreview').innerHTML = '';
    checkFormValidity();
}

function checkFormValidity() {
    const form = document.getElementById('serviceForm');
    const submitButton = document.getElementById('submitButton');
    const hasFiles = uploadedFiles.length > 0;
    const hasPaymentScreenshot = paymentScreenshot !== null;
    const formValid = form.checkValidity();
    
    submitButton.disabled = !(formValid && hasFiles && hasPaymentScreenshot);
}

['name', 'email', 'phone'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('input', checkFormValidity);
    }
});



async function uploadFileToImgBB(file) {
    try {
        // التحقق من حجم الملف (ImgBB يدعم حتى 32MB)
        const maxSize = 32 * 1024 * 1024; // 32MB
        if (file.size > maxSize) {
            console.warn(`⚠️ الملف ${file.name} كبير جداً (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
            return { 
                success: false, 
                error: `الملف كبير جداً (الحد الأقصى 32MB)` 
            };
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('expiration', 15552000); // الملف يبقى لمدة 6 أشهر
        
        console.log(`📤 جاري رفع: ${file.name} (${(file.size / 1024).toFixed(1)} KB)...`);
        
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ خطأ من الخادم:', response.status, errorText);
            throw new Error(`خطأ في الخادم: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
            console.log(`✅ تم رفع ${file.name} بنجاح!`);
            return {
                success: true,
                url: data.data.url,
                display_url: data.data.display_url,
                delete_url: data.data.delete_url,
                size: data.data.size,
                thumb_url: data.data.thumb ? data.data.thumb.url : data.data.url
            };
        } else {
            throw new Error(data.error?.message || 'فشل الرفع');
        }
    } catch (error) {
        console.error('❌ خطأ في رفع الملف:', file.name, error);
        return { 
            success: false, 
            error: error.message,
            fileName: file.name 
        };
    }
}

async function uploadAllFiles(files, updateProgress) {
    const uploadedLinks = [];
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const progressPercent = 40 + (i / files.length) * 30; // من 40% إلى 70%
        updateProgress(`جاري رفع الملف ${i + 1} من ${files.length}: ${file.name}...`, progressPercent);
        
        // رفع الصور وملفات PDF
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
            const result = await uploadFileToImgBB(file);
            
            if (result.success) {
                successCount++;
                uploadedLinks.push({
                    name: file.name,
                    url: result.url,
                    thumb_url: result.thumb_url || result.url,
                    size: result.size,
                    type: file.type,
                    status: 'success'
                });
                console.log(`✅ نجح رفع: ${file.name}`);
            } else {
                failCount++;
                uploadedLinks.push({
                    name: file.name,
                    url: null,
                    error: result.error || 'فشل الرفع',
                    type: file.type,
                    status: 'failed'
                });
                console.error(`❌ فشل رفع: ${file.name} - ${result.error}`);
            }
        } else {
            // الملفات الأخرى (Word, Excel, etc.)
            uploadedLinks.push({
                name: file.name,
                url: null,
                type: file.type,
                status: 'email-only',
                note: 'سيتم إرساله عبر البريد الإلكتروني'
            });
            console.log(`📧 الملف ${file.name} سيُرسل عبر البريد`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    console.log(`\n📊 نتيجة الرفع: ✅ ${successCount} نجح | ❌ ${failCount} فشل`);
    return uploadedLinks;
}

// دالة لإنشاء رسالة واتساب مع روابط الملفات
function createWhatsAppMessageWithLinks(formData, fileLinks, screenshotLink) {
    let message = `*🔔 طلب خدمة جديد*

*الخدمة:* ${currentService.title}
*السعر:* ${currentService.price.toLocaleString()} ريال

*👤 بيانات العميل:*
• الاسم: ${formData.name}
• الهاتف: ${formData.phone}
• البريد: ${formData.email}
${formData.company ? `• الشركة: ${formData.company}` : ''}
`;

    const successfulUploads = fileLinks.filter(f => f.status === 'success' && f.url);
    const failedUploads = fileLinks.filter(f => f.status === 'failed');
    const emailOnlyFiles = fileLinks.filter(f => f.status === 'email-only');
    
    if (successfulUploads.length > 0) {
        message += `\n*📎 الملفات المرفوعة (${successfulUploads.length}):*\n`;
        successfulUploads.forEach((file, index) => {
            message += `${index + 1}. ${file.name}\n   🔗 ${file.url}\n\n`;
        });
    }

    if (failedUploads.length > 0) {
        message += `\n*⚠️ ملفات فشل رفعها (${failedUploads.length}):*\n`;
        failedUploads.forEach((file, index) => {
            message += `${index + 1}. ${file.name}\n`;
        });
        message += `\n_سيتم إرسالها عبر البريد الإلكتروني_\n`;
    }

    if (emailOnlyFiles.length > 0) {
        message += `\n*📧 ملفات ستُرسل بالبريد (${emailOnlyFiles.length}):*\n`;
        emailOnlyFiles.forEach((file, index) => {
            message += `${index + 1}. ${file.name}\n`;
        });
    }

    if (screenshotLink && screenshotLink.success) {
        message += `\n*✅ إيصال الدفع:*\n🔗 ${screenshotLink.url}\n`;
    }

    if (formData.notes) {
        message += `\n*📝 ملاحظات:*\n${formData.notes}\n`;
    }

    message += `\n*📅 تاريخ الطلب:* ${formData.date}

_تم الإرسال من موقع المكتب الإلكتروني_`;
    
    return encodeURIComponent(message);
}

document.getElementById('serviceForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = document.getElementById('submitButton');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    
    const progressDiv = document.createElement('div');
    progressDiv.id = 'uploadProgress';
    progressDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        min-width: 300px;
        text-align: center;
    `;
    progressDiv.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 15px;">⏳</div>
        <h3 style="color: #1e3c72; margin-bottom: 10px;">جاري المعالجة</h3>
        <p id="progressText" style="color: #666; margin-bottom: 15px;">جاري تجهيز البيانات...</p>
        <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
            <div id="progressBar" style="background: linear-gradient(to right, #1e3c72, #2a5298); height: 100%; width: 0%; transition: width 0.3s;"></div>
        </div>
    `;
    document.body.appendChild(progressDiv);
    
    const updateProgress = (text, percent = null) => {
        document.getElementById('progressText').textContent = text;
        if (percent !== null) {
            document.getElementById('progressBar').style.width = percent + '%';
        }
    };
    
    try {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const company = document.getElementById('company').value;
        const notes = document.getElementById('notes').value;

        const formData = {
            service: currentService.title,
            price: currentService.price,
            name: name,
            email: email,
            phone: phone,
            company: company,
            notes: notes,
            date: new Date().toLocaleString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        updateProgress('جاري رفع إيصال الدفع...', 20);
        let screenshotLink = null;
        if (paymentScreenshot) {
            screenshotLink = await uploadFileToImgBB(paymentScreenshot);
        }
        
        updateProgress('جاري رفع الملفات...', 40);
        const fileLinks = await uploadAllFiles(uploadedFiles, updateProgress);
        
        updateProgress('جاري حفظ البيانات...', 60);
        try {
            const existingOrders = JSON.parse(localStorage.getItem('serviceOrders') || '[]');
            existingOrders.push({
                ...formData,
                id: Date.now(),
                timestamp: new Date().toISOString(),
                fileLinks: fileLinks,
                screenshotLink: screenshotLink
            });
            localStorage.setItem('serviceOrders', JSON.stringify(existingOrders));
        } catch (storageError) {
            console.log('⚠️ تحذير: لم يتم الحفظ المحلي:', storageError);
        }
        
        updateProgress('جاري تجهيز رسالة واتساب...', 80);
        const whatsappMessage = createWhatsAppMessageWithLinks(formData, fileLinks, screenshotLink);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
        
        updateProgress('جاري إرسال البريد...', 90);
        sendEmailWithFormSubmit(formData, fileLinks, screenshotLink).catch(err => {
            console.log('⚠️ لم يتمكن من إرسال البريد:', err);
        });
        
        updateProgress('تم بنجاح! ✅', 100);
        setTimeout(() => {
            document.body.removeChild(progressDiv);
        }, 1000);
        
        const successMessage = document.getElementById('successMessage');
        
        const successfulUploads = fileLinks.filter(f => f.status === 'success');
        const failedUploads = fileLinks.filter(f => f.status === 'failed');
        
        successMessage.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 3rem; margin-bottom: 10px;">✅</div>
                <h3 style="color: #10b981; margin-bottom: 10px;">تم معالجة طلبك بنجاح!</h3>
                <p style="margin-bottom: 15px;">جاري تحويلك إلى واتساب...</p>
                
                ${successfulUploads.length > 0 ? `
                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: right;">
                    <p style="font-weight: bold; color: #0284c7; margin-bottom: 10px;">✅ تم رفع ${successfulUploads.length} ملف بنجاح</p>
                    ${successfulUploads.map(f => `
                        <div style="margin: 5px 0; font-size: 0.9rem; display: flex; align-items: center; justify-content: space-between;">
                            <span>• ${f.name}</span>
                            <a href="${f.url}" target="_blank" style="color: #0284c7; text-decoration: none; font-size: 0.85rem;">عرض 🔗</a>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${failedUploads.length > 0 ? `
                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: right;">
                    <p style="font-weight: bold; color: #dc2626; margin-bottom: 10px;">⚠️ فشل رفع ${failedUploads.length} ملف</p>
                    ${failedUploads.map(f => `
                        <div style="margin: 5px 0; font-size: 0.9rem;">
                            • ${f.name} - ${f.error}
                        </div>
                    `).join('')}
                    <p style="margin-top: 10px; font-size: 0.85rem; color: #991b1b;">
                        💡 سيتم إرسال الملفات الفاشلة عبر البريد الإلكتروني
                    </p>
                </div>
                ` : ''}
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p style="font-size: 0.9rem; color: #059669; margin-bottom: 10px;">
                        <strong>إذا لم يتم التحويل تلقائياً:</strong>
                    </p>
                    <a href="${whatsappUrl}" 
                       target="_blank" 
                       style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;"
                       onmouseover="this.style.background='#128C7E'"
                       onmouseout="this.style.background='#25D366'">
                        📱 افتح واتساب الآن
                    </a>
                </div>
                <p style="font-size: 0.85rem; color: #666; margin-top: 15px;">
                    💡 ستجد الرسالة جاهزة مع روابط الملفات - فقط اضغط إرسال
                </p>
            </div>
        `;
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            window.location.href = whatsappUrl;
        }, 2000);
        
        this.reset();
        uploadedFiles = [];
        paymentScreenshot = null;
        document.getElementById('uploadedFiles').innerHTML = '';
        document.getElementById('screenshotPreview').innerHTML = '';
        
        window.scrollTo({top: 0, behavior: 'smooth'});
        
        setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = true;
        }, 5000);
        
    } catch (error) {
        console.error('❌ خطأ في المعالجة:', error);
        
        const progressDiv = document.getElementById('uploadProgress');
        if (progressDiv) {
            document.body.removeChild(progressDiv);
        }
        
        const successMessage = document.getElementById('successMessage');
        successMessage.innerHTML = `
            <div style="text-align: center; padding: 20px; background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px;">
                <div style="font-size: 3rem; margin-bottom: 10px;">⚠️</div>
                <h3 style="color: #dc2626; margin-bottom: 10px;">حدث خطأ!</h3>
                <p style="color: #991b1b; margin-bottom: 15px;">
                    ${error.message || 'عذراً، حدث خطأ أثناء معالجة طلبك.'}
                </p>
                <button onclick="location.reload()" 
                        style="background: #ef4444; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">
                    🔄 إعادة المحاولة
                </button>
            </div>
        `;
        successMessage.style.display = 'block';
        
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

async function sendEmailWithFormSubmit(formData, fileLinks, screenshotLink) {
    try {
        let filesSection = '';
        if (fileLinks && fileLinks.length > 0) {
            filesSection = fileLinks.map((f, i) => {
                if (f.url && f.url !== 'فشل الرفع' && f.url !== 'سيتم إرساله عبر البريد') {
                    return `   ${i + 1}. ${f.name}\n      🔗 ${f.url}`;
                } else {
                    return `   ${i + 1}. ${f.name} - ${f.url}`;
                }
            }).join('\n\n');
        }
        
        const emailBody = `
═══════════════════════════════════════════════════
    📋 طلب خدمة جديد من موقع مكتب خالد سعيد
═══════════════════════════════════════════════════

🔷 معلومات العميل:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 الاسم الكامل: ${formData.name}
📧 البريد الإلكتروني: ${formData.email}
📱 رقم الهاتف: ${formData.phone}
🏢 اسم الشركة: ${formData.company || 'غير محدد'}

🔷 تفاصيل الخدمة:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 الخدمة المطلوبة: ${formData.service}
💰 قيمة الخدمة: ${formData.price.toLocaleString()} ريال سعودي

🔷 الملاحظات الإضافية:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.notes || 'لا توجد ملاحظات إضافية'}

🔷 الملفات المرفوعة:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📎 عدد الملفات: ${fileLinks ? fileLinks.length : 0}

${filesSection}

🔷 إيصال الدفع:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${screenshotLink && screenshotLink.success ? `📸 ${screenshotLink.url}` : 'لم يتم رفع إيصال'}

🔷 معلومات النظام:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ تاريخ ووقت الطلب: ${formData.date}
🌐 المصدر: موقع المكتب الإلكتروني
🔗 الحالة: جديد - في انتظار المراجعة

═══════════════════════════════════════════════════
    ✨ يرجى متابعة الطلب مع العميل في أقرب وقت
═══════════════════════════════════════════════════
        `;

        const response = await fetch('https://formspree.io/f/mwpebgdl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: `🔔 طلب خدمة جديد من ${formData.name} - ${formData.service}`,
                _replyto: formData.email,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                service: formData.service,
                price: formData.price,
                message: emailBody,
                fileLinks: fileLinks ? JSON.stringify(fileLinks) : '[]',
                screenshotLink: screenshotLink ? screenshotLink.url : 'لا يوجد',
                _template: 'box'
            })
        });

        if (response.ok) {
            console.log('✅ تم إرسال البريد الإلكتروني بنجاح');
            return true;
        } else {
            console.log('⚠️ فشل إرسال البريد:', response.status);
            return false;
        }
    } catch (error) {
        console.log('⚠️ خطأ في إرسال البريد (لا يؤثر على الطلب):', error.message);
        return false;
    }
}

function showSavedOrders() {
    try {
        const orders = JSON.parse(localStorage.getItem('serviceOrders') || '[]');
        console.log('📦 الطلبات المحفوظة محلياً:');
        console.log('═══════════════════════════════════════');
        orders.forEach((order, index) => {
            console.log(`\n📋 الطلب رقم ${index + 1}:`);
            console.log(`   العميل: ${order.name}`);
            console.log(`   الخدمة: ${order.service}`);
            console.log(`   السعر: ${order.price} ريال`);
            console.log(`   التاريخ: ${order.date}`);
            if (order.fileLinks) {
                console.log(`   الملفات: ${order.fileLinks.length}`);
                order.fileLinks.forEach(f => {
                    console.log(`      - ${f.name}: ${f.url}`);
                });
            }
            if (order.screenshotLink) {
                console.log(`   إيصال الدفع: ${order.screenshotLink.url || 'غير متوفر'}`);
            }
            console.log('───────────────────────────────────────');
        });
        console.log(`\n📊 إجمالي الطلبات: ${orders.length}`);
        return orders;
    } catch (error) {
        console.error('❌ خطأ في قراءة الطلبات:', error);
        return [];
    }
}

function clearAllOrders() {
    if (confirm('⚠️ هل أنت متأكد من حذف جميع الطلبات المحفوظة؟')) {
        localStorage.removeItem('serviceOrders');
        console.log('✅ تم حذف جميع الطلبات المحفوظة');
        return true;
    }
    return false;
}

function exportOrdersToJSON() {
    try {
        const orders = JSON.parse(localStorage.getItem('serviceOrders') || '[]');
        const dataStr = JSON.stringify(orders, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `orders_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log('✅ تم تصدير الطلبات بنجاح');
        return true;
    } catch (error) {
        console.error('❌ خطأ في التصدير:', error);
        return false;
    }
}

console.log(`
╔════════════════════════════════════════════════════════╗
║     🎯 نظام إدارة طلبات الخدمات - مكتب خالد سعيد     ║
╚════════════════════════════════════════════════════════╝

📱 رقم الواتساب: ${WHATSAPP_NUMBER}
📧 البريد الإلكتروني: ${OWNER_EMAIL}
🔑 مفتاح ImgBB: ${IMGBB_API_KEY ? 'مفعّل ✅' : 'غير مفعّل ❌'}

════════════════════════════════════════════════════════

📌 دوال متاحة للمطورين:

1️⃣  showSavedOrders()
   📖 عرض جميع الطلبات المحفوظة محلياً
   
2️⃣  clearAllOrders()
   🗑️  حذف جميع الطلبات المحفوظة
   
3️⃣  exportOrdersToJSON()
   💾 تصدير الطلبات كملف JSON

════════════════════════════════════════════════════════

💡 مثال:
   > showSavedOrders()
   > exportOrdersToJSON()

════════════════════════════════════════════════════════
✨ النظام جاهز للعمل!
`);

// يمكنك استدعاء هذه الدوال من Console:
// showSavedOrders()        - لعرض الطلبات
// clearAllOrders()         - لحذف الطلبات
// exportOrdersToJSON()     - لتصدير الطلبات