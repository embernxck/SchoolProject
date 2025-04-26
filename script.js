// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', () => {
    // Add touchstart event to document for mobile
    let isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // Improve mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const allNavLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.setAttribute('aria-hidden', isExpanded);
            
            // Change icon based on state
            const menuIcon = mobileMenuBtn.querySelector('i');
            if (menuIcon) {
                if (isExpanded) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                } else {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                }
            }
        });
    }

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            e.target !== mobileMenuBtn && 
            !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
            
            const menuIcon = mobileMenuBtn.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });

    // Smooth scroll with better mobile support
    const scrollLinks = document.querySelectorAll('.nav-link');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                
                const menuIcon = mobileMenuBtn.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
            
            // Get the target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get header height dynamically
                const headerHeight = document.getElementById('header').offsetHeight;
                
                // Scroll to target section with smooth behavior
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update active link
                scrollLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                scrollLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // Sample data for news
    const newsData = [
        {
            id: 1,
            title: 'Начало учебного года',
            date: '1 сентября 2023',
            image: 'images/news/1.jpg',
            category: 'school',
            excerpt: 'Торжественная линейка, посвященная началу нового учебного года, состоится 1 сентября в 9:00 на школьной площади.',
            content: 'Торжественная линейка, посвященная началу нового учебного года, состоится 1 сентября в 9:00 на школьной площади. Приглашаем всех учеников, родителей и преподавателей. Особенно ждем наших первоклассников и выпускников. После линейки состоится классный час.'
        },
        {
            id: 2,
            title: 'Победа в городской олимпиаде',
            date: '15 октября 2023',
            image: 'images/news/2.jpg',
            category: 'achievements',
            excerpt: 'Наши ученики заняли первое место в городской олимпиаде по математике. Поздравляем победителей!',
            content: 'Наши ученики заняли первое место в городской олимпиаде по математике. Команда в составе: Иванов Иван (11А), Петрова Мария (10Б), Сидоров Алексей (11Б) показала отличные результаты в решении сложных математических задач. Поздравляем победителей и благодарим за подготовку их наставника - Елену Николаевну Математикову.'
        },
        {
            id: 3,
            title: 'Осенний фестиваль',
            date: '20 октября 2023',
            image: 'images/news/3.jpg',
            category: 'events',
            excerpt: 'Приглашаем всех учеников и родителей на осенний фестиваль, который состоится 20 октября в актовом зале школы.',
            content: 'Приглашаем всех учеников и родителей на осенний фестиваль, который состоится 20 октября в актовом зале школы. В программе: выставка поделок из природных материалов, концерт художественной самодеятельности, дегустация блюд из осенних даров. Начало мероприятия в 15:00. Будем рады видеть всех!'
        },
        {
            id: 4,
            title: 'Экскурсия в музей',
            date: '5 ноября 2023',
            image: 'images/news/4.jpg',
            category: 'events',
            excerpt: 'Ученики 5-7 классов посетят исторический музей в рамках изучения истории родного края.',
            content: 'Ученики 5-7 классов посетят исторический музей в рамках изучения истории родного края. Экскурсия запланирована на 5 ноября. Сбор у школы в 9:30. Возвращение ориентировочно в 14:00. При себе иметь воду, перекус и сменную обувь. Стоимость билета и проезда составляет 300 рублей.'
        },
        {
            id: 5,
            title: 'Родительское собрание',
            date: '10 ноября 2023',
            image: 'images/news/5.jpg',
            category: 'school',
            excerpt: 'Общешкольное родительское собрание состоится 10 ноября в 18:00 в актовом зале.',
            content: 'Общешкольное родительское собрание состоится 10 ноября в 18:00 в актовом зале. Повестка дня: подготовка к зимним каникулам, участие в городских конкурсах, вопросы питания и безопасности учеников. Явка родителей обязательна. После общего собрания пройдут классные собрания в кабинетах.'
        },
        {
            id: 6,
            title: 'Спортивные достижения',
            date: '15 ноября 2023',
            image: 'images/news/6.jpg',
            category: 'achievements',
            excerpt: 'Школьная команда по волейболу заняла 2 место в городских соревнованиях. Поздравляем наших спортсменов!',
            content: 'Школьная команда по волейболу заняла 2 место в городских соревнованиях. Наши спортсмены показали отличную игру, проявили командный дух и волю к победе. Особой похвалы заслуживает капитан команды, Дмитрий Волейболов (9А класс). Поздравляем ребят и их тренера, Сергея Петровича Спортивного!'
        }
    ];

    // Sample data for schedule
    const scheduleData = [
        {
            day: 'monday',
            class: '1A',
            subjects: [
                { time: '8:30 - 9:15', subject: 'Математика', teacher: 'Иванова И.И.' },
                { time: '9:25 - 10:10', subject: 'Русский язык', teacher: 'Петрова П.П.' },
                { time: '10:20 - 11:05', subject: 'Окружающий мир', teacher: 'Сидорова С.С.' },
                { time: '11:25 - 12:10', subject: 'Физкультура', teacher: 'Спортивный С.П.' }
            ]
        },
        {
            day: 'tuesday',
            class: '1A',
            subjects: [
                { time: '8:30 - 9:15', subject: 'Чтение', teacher: 'Петрова П.П.' },
                { time: '9:25 - 10:10', subject: 'Математика', teacher: 'Иванова И.И.' },
                { time: '10:20 - 11:05', subject: 'ИЗО', teacher: 'Рисовальная Р.Р.' },
                { time: '11:25 - 12:10', subject: 'Музыка', teacher: 'Нотная Н.Н.' }
            ]
        },
        {
            day: 'wednesday',
            class: '1A',
            subjects: [
                { time: '8:30 - 9:15', subject: 'Русский язык', teacher: 'Петрова П.П.' },
                { time: '9:25 - 10:10', subject: 'Математика', teacher: 'Иванова И.И.' },
                { time: '10:20 - 11:05', subject: 'Технология', teacher: 'Рукодельная Р.Р.' },
                { time: '11:25 - 12:10', subject: 'Физкультура', teacher: 'Спортивный С.П.' }
            ]
        },
        {
            day: 'thursday',
            class: '1A',
            subjects: [
                { time: '8:30 - 9:15', subject: 'Чтение', teacher: 'Петрова П.П.' },
                { time: '9:25 - 10:10', subject: 'Математика', teacher: 'Иванова И.И.' },
                { time: '10:20 - 11:05', subject: 'Окружающий мир', teacher: 'Сидорова С.С.' },
                { time: '11:25 - 12:10', subject: 'Английский язык', teacher: 'Инглиш И.И.' }
            ]
        },
        {
            day: 'friday',
            class: '1A',
            subjects: [
                { time: '8:30 - 9:15', subject: 'Русский язык', teacher: 'Петрова П.П.' },
                { time: '9:25 - 10:10', subject: 'Математика', teacher: 'Иванова И.И.' },
                { time: '10:20 - 11:05', subject: 'Физкультура', teacher: 'Спортивный С.П.' }
            ]
        },
        {
            day: 'monday',
            class: '2A',
            subjects: [
                { time: '8:30 - 9:15', subject: 'Русский язык', teacher: 'Буквина Б.Б.' },
                { time: '9:25 - 10:10', subject: 'Математика', teacher: 'Циферкина Ц.Ц.' },
                { time: '10:20 - 11:05', subject: 'Английский язык', teacher: 'Инглиш И.И.' },
                { time: '11:25 - 12:10', subject: 'Окружающий мир', teacher: 'Природина П.П.' }
            ]
        },
        {
            day: 'tuesday',
            class: '2A',
            subjects: [
                { time: '8:30 - 9:15', subject: 'Математика', teacher: 'Циферкина Ц.Ц.' },
                { time: '9:25 - 10:10', subject: 'Русский язык', teacher: 'Буквина Б.Б.' },
                { time: '10:20 - 11:05', subject: 'Чтение', teacher: 'Буквина Б.Б.' },
                { time: '11:25 - 12:10', subject: 'Физкультура', teacher: 'Спортивный С.П.' }
            ]
        }
    ];

    // Sample gallery data
    const galleryData = [
        {
            id: 1,
            image: 'images/gallery/school_celebration.jpg',
            caption: 'Школьный праздник'
        },
        {
            id: 2,
            image: 'images/gallery/sports_competition.jpg',
            caption: 'Спортивные соревнования'
        },
        {
            id: 3,
            image: 'images/gallery/chemistry_lesson.jpg',
            caption: 'Урок химии'
        },
        {
            id: 4,
            image: 'images/gallery/museum_trip.jpg',
            caption: 'Экскурсия в музей'
        },
        {
            id: 5,
            image: 'images/gallery/graduation.jpg',
            caption: 'Выпускной вечер'
        },
        {
            id: 6,
            image: 'images/gallery/first_bell.jpg',
            caption: 'Первый звонок'
        },
        {
            id: 7,
            image: 'images/gallery/school_olympiad.jpg',
            caption: 'Школьная олимпиада'
        },
        {
            id: 8,
            image: 'images/gallery/community_cleanup.jpg',
            caption: 'Субботник'
        }
    ];

    // Populate news
    const newsContainer = document.getElementById('news-container');
    const newsCategory = document.getElementById('news-category');

    function populateNews(category = 'all') {
        if (!newsContainer) return;
        
        // Clear existing news
        newsContainer.innerHTML = '';
        
        // Filter news based on category
        const filteredNews = category === 'all' 
            ? newsData 
            : newsData.filter(news => news.category === category);
        
        // Display news
        filteredNews.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <img src="${news.image}" alt="${news.title}" class="news-card-image">
                <div class="news-card-content">
                    <p class="news-card-date">${news.date}</p>
                    <h3 class="news-card-title">${news.title}</h3>
                    <p class="news-card-excerpt">${news.excerpt}</p>
                    <a href="#" class="news-card-link" data-id="${news.id}">Подробнее</a>
                </div>
            `;
            newsContainer.appendChild(newsCard);
        });
        
        // Add event listeners to "Read more" links
        const newsLinks = document.querySelectorAll('.news-card-link');
        newsLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const newsId = parseInt(link.getAttribute('data-id'));
                const news = newsData.find(item => item.id === newsId);
                
                if (news) {
                    alert(`${news.title}\n\n${news.content}`);
                }
            });
        });
    }
    
    // Initialize news section
    populateNews();
    
    // News category filter
    if (newsCategory) {
        newsCategory.addEventListener('change', () => {
            populateNews(newsCategory.value);
        });
    }

    // Handle schedule class selection
    const classNumberSelect = document.getElementById('class-number');
    const classLetterSelect = document.getElementById('class-letter');
    const scheduleContainer = document.getElementById('schedule-container');

    // Данные для букв классов в зависимости от номера класса
    const classLetters = {
        '1': ['А', 'Б', 'В', 'Г', 'Д'],
        '2': ['А', 'Б', 'В', 'Г', 'Д'],
        '3': ['А', 'Б', 'В', 'Г', 'Д'],
        '4': ['А', 'Б', 'В', 'Г', 'Д'],
        '5': ['А', 'Б', 'В', 'Г', 'Д'],
        '6': ['А', 'Б', 'В', 'Г', 'Д'],
        '7': ['А', 'Б', 'В', 'Г', 'Д'],
        '8': ['А', 'Б', 'В', 'Г', 'Д'],
        '9': ['А', 'Б', 'В', 'Г', 'Д'],
        '10': ['А', 'Б', 'В', 'Г', 'Д'],
        '11': ['А', 'Б', 'В', 'Г', 'Д']
    };

    // Функция для заполнения списка букв класса
    function populateClassLetters(classNumber) {
        if (!classLetterSelect) return;
        
        // Очищаем текущий список букв
        classLetterSelect.innerHTML = '';
        
        // Добавляем заголовок
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.text = 'Выберите букву';
        defaultOption.selected = true;
        classLetterSelect.add(defaultOption);
        
        // Получаем буквы для выбранного номера класса
        const letters = classLetters[classNumber] || [];
        
        // Добавляем буквы в список
        letters.forEach(letter => {
            const option = document.createElement('option');
            option.value = letter;
            option.text = letter;
            classLetterSelect.add(option);
        });
        
        // Разблокируем выбор буквы
        classLetterSelect.disabled = false;
    }

    // Функция для отображения расписания выбранного класса
    function showScheduleForClass(className) {
        if (!scheduleContainer) return;
        
        // Обновляем содержимое контейнера с расписанием
        scheduleContainer.innerHTML = ''; // Очищаем существующее содержимое
        scheduleContainer.classList.add('active'); // Показываем контейнер
        
        // Дни недели
        const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
        
        // Создаем карточку расписания для каждого дня
        days.forEach(day => {
            // Создаем карточку расписания для этого дня
            const scheduleCard = document.createElement('div');
            scheduleCard.className = 'schedule-card';
            
            // Создаем заголовок карточки
            const cardHeader = document.createElement('div');
            cardHeader.className = 'schedule-card-header';
            
            const dayDiv = document.createElement('div');
            dayDiv.className = 'schedule-card-day';
            dayDiv.textContent = day;
            
            const classDiv = document.createElement('div');
            classDiv.className = 'schedule-card-class';
            classDiv.textContent = `${className} класс`;
            
            cardHeader.appendChild(dayDiv);
            cardHeader.appendChild(classDiv);
            scheduleCard.appendChild(cardHeader);
            
            // Генерируем случайное количество уроков (4-6)
            const numClasses = Math.floor(Math.random() * 3) + 4;
            
            // Выбираем предметы в зависимости от уровня класса
            let subjects = ['Математика', 'Русский язык', 'Литература', 'История', 
                          'Биология', 'География', 'Физика', 'Химия', 'Английский язык', 
                          'Физкультура', 'Информатика', 'ОБЖ'];
            
            // Для начальной школы (1-4 классы)
            if (parseInt(className) <= 4) {
                subjects = ['Математика', 'Русский язык', 'Чтение', 'Окружающий мир', 
                           'ИЗО', 'Технология', 'Физкультура', 'Музыка'];
            }
            
            // Список учителей
            const teachers = ['Иванова А.П.', 'Петрова Т.С.', 'Сидоров В.И.', 
                             'Кузнецова Л.А.', 'Морозов Д.И.', 'Соколов А.В.', 
                             'Николаева Е.С.', 'Волкова М.Д.'];
            
            // Начальное время
            let hour = 8;
            let minute = 30;
            
            // Создаем элементы расписания
            for (let i = 0; i < numClasses; i++) {
                // Создаем элемент расписания
                const item = document.createElement('div');
                item.className = 'schedule-card-item';
                
                // Создаем блок с временем
                const timeDiv = document.createElement('div');
                timeDiv.className = 'schedule-card-time';
                
                // Вычисляем время
                const startTime = `${hour}:${minute < 10 ? '0' + minute : minute}`;
                
                // Каждый урок длится 45 минут
                minute += 45;
                if (minute >= 60) {
                    hour += 1;
                    minute -= 60;
                }
                
                const endTime = `${hour}:${minute < 10 ? '0' + minute : minute}`;
                timeDiv.textContent = `${startTime} - ${endTime}`;
                
                // Добавляем 10 минутный перерыв
                minute += 10;
                if (minute >= 60) {
                    hour += 1;
                    minute -= 60;
                }
                
                // Создаем блок с предметом
                const subjectDiv = document.createElement('div');
                subjectDiv.className = 'schedule-card-subject';
                
                // Выбираем случайный предмет
                const randomSubjectIndex = Math.floor(Math.random() * subjects.length);
                subjectDiv.textContent = subjects[randomSubjectIndex];
                
                // Создаем блок с учителем
                const teacherDiv = document.createElement('div');
                teacherDiv.className = 'schedule-card-teacher';
                
                // Выбираем случайного учителя
                const randomTeacherIndex = Math.floor(Math.random() * teachers.length);
                teacherDiv.textContent = teachers[randomTeacherIndex];
                
                // Добавляем все элементы
                item.appendChild(timeDiv);
                item.appendChild(subjectDiv);
                item.appendChild(teacherDiv);
                
                // Добавляем элемент в карточку
                scheduleCard.appendChild(item);
            }
            
            // Добавляем карточку в контейнер
            scheduleContainer.appendChild(scheduleCard);
        });
    }

    // Инициализация выбора класса
    function initClassSelection() {
        if (!classNumberSelect || !classLetterSelect) return;
        
        console.log("Initializing class selection");
        
        // Получаем сохраненные значения из localStorage
        const savedClassNumber = localStorage.getItem('classNumber');
        const savedClassLetter = localStorage.getItem('classLetter');
        
        console.log("Saved values:", savedClassNumber, savedClassLetter);
        
        // Если есть сохраненный номер класса, используем его
        if (savedClassNumber) {
            classNumberSelect.value = savedClassNumber;
            populateClassLetters(savedClassNumber);
            
            if (savedClassLetter) {
                // Даем время для загрузки букв
                setTimeout(() => {
                    // Находим опцию с такой же буквой
                    const options = Array.from(classLetterSelect.options);
                    const matchingOption = options.find(option => option.value === savedClassLetter);
                    
                    if (matchingOption) {
                        classLetterSelect.value = savedClassLetter;
                        showScheduleForClass(savedClassNumber + savedClassLetter);
                    }
                }, 100);
            }
        } else {
            // Если уже выбран класс в HTML (через атрибут selected)
            const selectedNumber = classNumberSelect.value;
            if (selectedNumber) {
                populateClassLetters(selectedNumber);
            }
        }
    }
    
    // Вызываем инициализацию
    initClassSelection();
    
    // Обработчик выбора номера класса
    if (classNumberSelect) {
        classNumberSelect.addEventListener('change', function() {
            const classNumber = this.value;
            
            if (classNumber) {
                console.log("Class number selected:", classNumber);
                
                // Сохраняем выбор в localStorage
                localStorage.setItem('classNumber', classNumber);
                
                // Загружаем соответствующие буквы
                populateClassLetters(classNumber);
                
                // Если уже выбрана буква, проверяем, доступна ли она для нового класса
                const classLetter = classLetterSelect.value;
                if (classLetter) {
                    // Проверяем, есть ли такая буква для нового класса
                    const letterExists = classLetters[classNumber].includes(classLetter);
                    
                    if (letterExists) {
                        // Если такая буква есть, обновляем расписание
                        showScheduleForClass(classNumber + classLetter);
                    } else {
                        // Если такой буквы нет, сбрасываем выбор буквы
                        classLetterSelect.value = '';
                        localStorage.removeItem('classLetter');
                    }
                }
            } else {
                classLetterSelect.disabled = true;
                localStorage.removeItem('classNumber');
                localStorage.removeItem('classLetter');
            }
        });
    }
    
    // Обработчик выбора буквы класса
    if (classLetterSelect) {
        classLetterSelect.addEventListener('change', function() {
            const classLetter = this.value;
            
            if (classLetter) {
                console.log("Class letter selected:", classLetter);
                
                // Сохраняем выбор в localStorage
                localStorage.setItem('classLetter', classLetter);
                
                // Получаем выбранный номер класса
                const classNumber = classNumberSelect.value;
                
                // Показываем расписание
                if (classNumber) {
                    showScheduleForClass(classNumber + classLetter);
                }
            } else {
                localStorage.removeItem('classLetter');
            }
        });
    }

    // Модальное окно
    const modal = document.getElementById('success-modal');
    const modalBtn = document.getElementById('success-modal-btn');

    if (modalBtn) {
        modalBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Функция для открытия модального окна
    function openModal() {
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    }

    // Функция для закрытия модального окна
    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 400);
        }
    }

    // Закрытие модального окна при клике на фон
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Форма обратной связи
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация формы
            if (validateForm()) {
                // Эмуляция отправки формы
                setTimeout(() => {
                    // Сбрасываем форму
                    contactForm.reset();
                    
                    // Показываем модальное окно успеха
                    openModal();
                }, 1000);
            }
        });
    }

    // Функция для валидации формы
    function validateForm() {
        let isValid = true;
        
        // Получаем поля формы
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Очищаем предыдущие сообщения об ошибках
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.textContent = '';
        });
        
        // Проверяем имя
        if (!nameInput.value.trim()) {
            document.getElementById('name-error').textContent = 'Пожалуйста, введите ваше имя';
            isValid = false;
        }
        
        // Проверяем email
        if (!emailInput.value.trim()) {
            document.getElementById('email-error').textContent = 'Пожалуйста, введите ваш email';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            document.getElementById('email-error').textContent = 'Пожалуйста, введите корректный email';
            isValid = false;
        }
        
        // Проверяем тему
        if (!subjectInput.value.trim()) {
            document.getElementById('subject-error').textContent = 'Пожалуйста, введите тему сообщения';
            isValid = false;
        }
        
        // Проверяем сообщение
        if (!messageInput.value.trim()) {
            document.getElementById('message-error').textContent = 'Пожалуйста, введите текст сообщения';
            isValid = false;
        }
        
        return isValid;
    }

    // Функция для проверки корректности email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Populate gallery
    const galleryContainer = document.getElementById('gallery-container');
    const galleryModal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');

    function populateGallery() {
        if (!galleryContainer) return;
        
        // Clear existing gallery
        galleryContainer.innerHTML = '';
        
        // Check if mobile 
        const isMobile = window.innerWidth <= 768;
        const imagesToShow = isMobile ? 4 : galleryData.length;
        
        // Display gallery items 
        const itemsToShow = isMobile ? galleryData.slice(0, imagesToShow) : galleryData;
        
        itemsToShow.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.caption}" loading="lazy" data-id="${item.id}">
                <div class="gallery-item-caption">${item.caption}</div>
            `;
            galleryContainer.appendChild(galleryItem);
            
            // Add click event to open modal
            galleryItem.addEventListener('click', () => {
                modalImage.src = item.image;
                modalCaption.textContent = item.caption;
                galleryModal.style.display = 'block';
                
                // Add class for animation
                setTimeout(() => {
                    galleryModal.classList.add('show');
                }, 10);
                
                // Prevent scrolling when modal is open
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Add "View All" button for mobile
        if (isMobile && galleryData.length > imagesToShow) {
            const viewAllBtn = document.createElement('div');
            viewAllBtn.className = 'view-all-btn';
            viewAllBtn.innerHTML = `
                <button class="btn btn-primary">Смотреть все (${galleryData.length})</button>
            `;
            galleryContainer.appendChild(viewAllBtn);
            
            viewAllBtn.addEventListener('click', () => {
                // Clear gallery first
                galleryContainer.innerHTML = '';
                
                // Show all images
                galleryData.forEach(item => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.innerHTML = `
                        <img src="${item.image}" alt="${item.caption}" loading="lazy" data-id="${item.id}">
                        <div class="gallery-item-caption">${item.caption}</div>
                    `;
                    galleryContainer.appendChild(galleryItem);
                    
                    // Add click event to open modal
                    galleryItem.addEventListener('click', () => {
                        modalImage.src = item.image;
                        modalCaption.textContent = item.caption;
                        galleryModal.style.display = 'block';
                        setTimeout(() => {
                            galleryModal.classList.add('show');
                        }, 10);
                        document.body.style.overflow = 'hidden';
                    });
                });
                
                // Add "Show Less" button
                const showLessBtn = document.createElement('div');
                showLessBtn.className = 'view-all-btn';
                showLessBtn.innerHTML = `
                    <button class="btn">Свернуть</button>
                `;
                galleryContainer.appendChild(showLessBtn);
                
                showLessBtn.addEventListener('click', () => {
                    populateGallery(); // Repopulate with limited items
                });
            });
        }
    }
    
    // Initialize gallery section
    populateGallery();
    
    // Handle window resize for gallery
    window.addEventListener('resize', () => {
        populateGallery();
    });
    
    // Close gallery modal with enhanced functionality
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            galleryModal.classList.remove('show');
            setTimeout(() => {
                galleryModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });
    }
    
    // Close gallery modal when clicking outside the image
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.classList.remove('show');
                setTimeout(() => {
                    galleryModal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
        
        // Add swipe support for mobile
        if (isTouchDevice) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            galleryModal.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            galleryModal.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
            
            function handleSwipe() {
                const swipeThreshold = 100;
                
                if (touchEndX - touchStartX > swipeThreshold) {
                    // Swiped right - previous image
                    changeImage(-1);
                } else if (touchStartX - touchEndX > swipeThreshold) {
                    // Swiped left - next image
                    changeImage(1);
                }
            }
            
            function changeImage(direction) {
                if (!modalImage.src) return;
                
                // Find current image index
                const currentSrc = modalImage.src;
                const currentItem = galleryData.find(item => currentSrc.includes(item.image.split('/').pop()));
                
                if (currentItem) {
                    const currentIndex = galleryData.indexOf(currentItem);
                    let newIndex = currentIndex + direction;
                    
                    // Handle wrapping
                    if (newIndex < 0) newIndex = galleryData.length - 1;
                    if (newIndex >= galleryData.length) newIndex = 0;
                    
                    // Update modal with new image
                    modalImage.src = galleryData[newIndex].image;
                    modalCaption.textContent = galleryData[newIndex].caption;
                }
            }
        }
    }

    // Get current year for footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Школьный сайт. Все права защищены.`;
    }

    // Функция для проверки мобильного устройства
    function isMobileDevice() {
        return (window.innerWidth <= 768 || navigator.maxTouchPoints > 0);
    }
}); 