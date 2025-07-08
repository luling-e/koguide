// 해상도 계산 용 변수, 줄일 때마다 다시 사이즈 불러오기
let bw = $(window).width();
let wdh = $(window).height(); // 창의 높이
$(window).resize(function(){
    bw = $(window).width();
});

let chk = 0; // 서치 버튼 눌려있을 때 이미지 안 바뀌는 것 방지용

// header pc 버전 마우스 올리면 메뉴 열기
$('.gnb > li').on('mouseover focusin', function () {
    chk = 0;
    if (bw > 800) {
        $('.gnb li .bg').hide();
        $(this).children('.bg').show();

        let blogo = $('h1 img').attr('data-hover');
        let bsearch = $('.hdbtn li .search_btn img').attr('data-hover');
        let bmenuall = $('.hdbtn li .m_menu_toggle img').attr('data-hover');

        $('h1 img').attr('src', blogo);
        $('.hdbtn li .search_btn img').attr('src', bsearch);
        $('.hdbtn li .m_menu_toggle img').attr('src', bmenuall);

        $('header').addClass('on').removeClass('search');
        $('.black').addClass('on').removeClass('search');
    };
});

// header pc 버전 마우스 내리면 메뉴 닫기
$('header').on('mouseleave focusout', function () {
    if (bw > 800 && chk == 0) {                
        $('.gnb li .bg').hide();

        let blogo = $('h1 img').attr('data-leave');
        let bsearch = $('.search_btn img').attr('data-leave');
        let bmenuall = $('.m_menu_toggle img').attr('data-leave');

        $('h1 img').attr('src', blogo);
        $('.search_btn img').attr('src', bsearch);
        $('.m_menu_toggle img').attr('src', bmenuall);

        $('header').removeClass('on');
        $('.black').removeClass('on');
    };
});

// search_btn 클릭 시 서치 메뉴 열기
$('.search_btn').click(function() {
    chk = 1;
    if(bw > 800) {
        // $(this).next('.search_box').show();

        let blogo = $('h1 img').attr('data-hover');
        let bmenuall = $('.hdbtn li .m_menu_toggle img').attr('data-hover');
        $('h1 img').attr('src', blogo);
        $('.m_menu_toggle img').attr('src', bmenuall);

        $('.gnb li .bg').hide();

        $('header').addClass('search');
        $('.black').addClass('search');
    };
});

// search_btn 클릭 시 서치 메뉴 닫기
$('.search_close').click(function() {
    chk = 0;
    if(bw > 800 ) {
        // $('.search_btn').next('.search_box').hide();

        let blogo = $('h1 img').attr('data-leave');
        let bmenuall = $('.hdbtn li .m_menu_toggle img').attr('data-leave');
        $('h1 img').attr('src', blogo);
        $('.m_menu_toggle img').attr('src', bmenuall);

        $('header').removeClass('search');
        $('.black').removeClass('search');
    };
});

// 여기서부터 모바일
//.m_menu_toggle 클릭 시 모바일 메뉴 열기
$('.m_menu_toggle').click(function() {
    if(bw <= 800) {
        $('header').addClass('mob');
        $('html').addClass('fix');
    };
});

// gnb > li 클릭 시 서브메뉴 열고 닫기
$('.gnb > li > a').click(function() {
    if(bw <= 800) {
        $(this).next('.bg').stop().slideToggle(300).parent().siblings().children('.bg').stop().slideUp(300);
        $('.gnb > li').siblings().find('.bigsub > li:has(ul) > a').next('ul').stop().slideUp();
    };
});

// bigsub > li 클릭 시 하위 ul 열고 닫기
$('.bigsub > li').has('ul').children('a').click(function() {
    if(bw <= 800) {
        $(this).next().stop().slideToggle(300).parent().siblings().children("ul").slideUp(300);
    };
});

// m_menu_close 클릭 시 모바일 메뉴 닫기
$('.m_menu_close').click(function() {
    if(bw <= 800 ) {
        $('header').removeClass('mob');
        $('html').removeClass('fix');
    };
}); 

// search_btn 클릭 시 모바일 서치 메뉴 열기
$('.search_btn').click(function() {
    if(bw <= 800) { 
        $('header').addClass('mob_search');
        $('html').addClass('fix'); 

        let blogo = $('h1 img').attr('data-hover');
        let bmenuall = $('.hdbtn li .m_menu_toggle img').attr('data-hover');
        $('h1 img').attr('src', blogo);
        $('.m_menu_toggle img').attr('src', bmenuall);
    };
});

//  search_close 클릭 시 모바일 서치 메뉴 닫기
$('.search_close').click(function() {
    if(bw <= 800) { 
        $('header').removeClass('mob_search');
        $('html').removeClass('fix'); 

        let blogo = $('h1 img').attr('data-leave');
        let bmenuall = $('.hdbtn li .m_menu_toggle img').attr('data-leave');
        $('h1 img').attr('src', blogo);
        $('.m_menu_toggle img').attr('src', bmenuall);
    };
});

$(function () {
    // ────────────── 변수 선언 ──────────────
    const fimg = $('#main_visual .frame > img'); // 슬라이드 이미지들
    const mvline = $('#main_visual .line'); // 하단 선 애니메이션 요소
    const bmenuli = $('.mv_bmenu > li'); // 메뉴 버튼들
    const smenu = $('#main_visual .mv_bmenu > li > .mv_smenu'); // 서브메뉴들
    const mvslbtn = $('#main_visual .slide_btn'); // 슬라이드 재생/정지 버튼
    const mvslbtnimg = mvslbtn.find('img'); // 버튼 내 이미지
    let idx = 0; // 현재 슬라이드 인덱스
    let slideTimer; // 슬라이드 자동 실행 타이머
    let mvslplay = true; // 슬라이드 재생 상태
    let frld = true; // 첫 로딩 여부
    let bw = $(window).width(); // 화면 너비

    // ────────────── 첫 이미지 초기 설정 ──────────────
    const fimgfr = fimg.eq(0);
    fimgfr.addClass('big'); // 첫 이미지에 확대 클래스 추가

    // 초기 등장 애니메이션 (텍스트 및 서브메뉴)
    setTimeout(() => {
        fimgfr.addClass('visible'); // 이미지 보이기
        $('#main_visual h3, .mv_bmenu').addClass('start'); // 텍스트/메뉴 애니메이션

        if (frld) {
            smenu.eq(0).addClass('start'); // 첫 서브메뉴만 start
            frld = false; // 한 번만 실행
        }
    }, 700);

    // ────────────── 선 애니메이션 함수 ──────────────
    function line_move() {
    mvline.stop(true, true).css({ width: '0%' }).animate({ width: '100%' }, 1600, 'swing');
    }

    // ────────────── 메뉴/서브메뉴 상태 업데이트 ──────────────
    function smenu_update(index) {
        bmenuli.removeClass('select').eq(index).addClass('select'); // 메뉴 강조
        smenu.removeClass('on start').eq(index).addClass('on'); // 해당 서브메뉴 on
    }

    // ────────────── 슬라이드 전환 함수 ──────────────
    function showSlide(index) {
        const mvprev = fimg.eq(idx); // 현재 이미지
        const mvnext = fimg.eq(index); // 다음 이미지

        mvprev.addClass('fadeout').removeClass('visible big'); // 현재 이미지 서서히 사라짐
        mvnext.removeClass('fadeout visible').addClass('big'); // 다음 이미지 확대

        setTimeout(() => {
            mvnext.addClass('visible'); // 다음 이미지 나타나기
            line_move(); // 선 애니메이션
            smenu_update(index); // 메뉴/서브메뉴 상태 업데이트
        }, 700);

        idx = index; // 현재 인덱스 갱신
    }

    // ────────────── 자동 슬라이드 시작 ──────────────
    function startSlideLoop() {
        clearInterval(slideTimer); // 기존 타이머 제거
        slideTimer = setInterval(() => {
            const nextIdx = (idx + 1) % fimg.length; // 다음 인덱스
            showSlide(nextIdx); // 슬라이드 전환
        }, 7000); // 7초 간격
    }

    // ────────────── 자동 슬라이드 멈춤 ──────────────
    function stopSlideLoop() {
        clearInterval(slideTimer);
    }

    // ────────────── 슬라이드 버튼 상태 토글 함수 ──────────────
    function toggleSlideControl(play) {
        mvslbtnimg
            .attr('src', play ? 'images/btn_slide_control_stop.svg' : 'images/btn_slide_control_play.svg')
            .attr('alt', play ? 'stop' : 'play');
    }

    // ────────────── 초기 실행 ──────────────
    line_move(); // 선 애니메이션 시작
    smenu_update(idx); // 메뉴 상태 초기화
    startSlideLoop(); // 자동 슬라이드 시작

    // ────────────── 메뉴 클릭 시 슬라이드 전환 ──────────────
    bmenuli.on('click focusin', function () {
        const clickIdx = $(this).index();
        showSlide(clickIdx); // 해당 슬라이드 보여주기

        if (mvslplay) {
            stopSlideLoop(); // 자동 슬라이드 잠시 멈춤
            setTimeout(startSlideLoop, 2000); // 2초 후 재시작
        }
    });

    // ────────────── 서브 메뉴 클릭 시 상위 메뉴 이벤트 차단 ──────────────
    smenu.find('li').on('click', function (event) {
        event.stopPropagation(); // 부모 메뉴로 이벤트 전달 차단
    });

    // ────────────── 슬라이드 재생/정지 버튼 클릭 시 ──────────────
    mvslbtn.on('click', function () {
        mvslplay = !mvslplay; // 상태 반전
        toggleSlideControl(mvslplay); // 이미지 변경

        mvslplay ? startSlideLoop() : stopSlideLoop(); // 상태에 따라 슬라이드 제어
    });
});

//서브메뉴 li 너비 자동 조정
$(function () {
    if (bw > 800) {
        $('#main_visual .mv_smenu').each(function () {
            let smenuli = $(this).find('li');
            let smlnum = smenuli.length;
            let smlwidth = (100 / smlnum) + '%';

            smenuli.css('width', smlwidth);
        });
    }
});

// 알림마당 슬라이드
let npn = 1; // 페이지 넘버
let nsw = $('#main_notice .wrap > ul li').width(); // 이미지 한 개의 너비
let nsnum = $('#main_notice .n_slide a').length; // 이미지 개수 (여기서는 2개)
let nck = 0; // 일시정지 체크용 변수들

// 버튼 상태 업데이트 함수
function up_nbtn() {
    if (npn === 1) {
        $('#main_notice .n_prev').css({'opacity': '0.5'}).prop('disabled', true); // 비활성화
    } else {
        $('#main_notice .n_prev').css({'opacity': '1'}).prop('disabled', false); // 활성화
    }

    if (npn === nsnum) {
        $('#main_notice .n_next').css({'opacity': '0.5'}).prop('disabled', true); // 비활성화
    } else {
        $('#main_notice .n_next').css({'opacity': '1'}).prop('disabled', false); // 활성화
    }
}

// 페이지 번호 업데이트 함수
function up_npn() {
    $('#main_notice .n_pn').text(('0' + npn).slice(-2));
};

function notice_slide() {
    // 슬라이드 애니메이션
    $('#main_notice .n_slide').animate({'left': -nsw}, 1000, function () {
        // 첫 번째 이미지를 마지막으로 보냄
        $(this).append($(this).find('a:first-child'));
        $(this).css({'left': 0}); // 위치 초기화

        npn++;
        if (npn > nsnum) {
            npn = 1; // 마지막 페이지를 지나면 첫 페이지로 돌아가도록
        }
        up_nbtn(); // 페이지 번호 업데이트
        up_npn(); // 버튼 상태 업데이트
    });
}

// 7초마다 슬라이드 전환
let n_timer = setInterval('notice_slide()', 7000);

// 알림마당 슬라이드 이전 버튼
$('#main_notice .n_prev').click(function () {
    if (nck == 0) {
        clearInterval(n_timer);
        n_timer = setInterval(notice_slide, 7000);
    }

    // 슬라이드 애니메이션 (이전 버튼 클릭 시)
    $('#main_notice .n_slide').css({'left': -nsw}).prepend($('#main_notice .n_slide a:last-child')).animate({'left': 0}, 1000, function () {
        npn--;
        if (npn < 1) {
            npn = nsnum; // 페이지 번호가 1보다 작아지면 마지막 번호로
        }
        up_nbtn(); // 페이지 번호 업데이트
        up_npn(); // 버튼 상태 업데이트
    });
});

// 알림마당 슬라이드 다음 버튼
$('#main_notice .n_next').click(function () {
    if (nck == 0) {
        clearInterval(n_timer);
        n_timer = setInterval(notice_slide, 7000);
    }

    notice_slide(); // 슬라이드 전환
    up_nbtn(); // 페이지 번호 업데이트
});

// 알림마당 슬라이드 재생/정지 토글 버튼
$("#main_notice .n_toggle").click(function () {
    if (nck === 0) {
        nck = 1; // 일시정지 상태로 변경
        clearInterval(n_timer); // 타이머 정지
        $('#main_notice .n_toggle img').attr('src', 'images/slide_btn_play.svg'); // 재생 버튼 이미지로 변경
    } else {
        nck = 0; // 재생 상태로 변경
        n_timer = setInterval(notice_slide, 7000); // 슬라이드 재생
        $('#main_notice .n_toggle img').attr('src', 'images/slide_btn_pause.svg'); // 일시정지 버튼 이미지로 변경
    }
});

$(document).ready(function () {
    up_nbtn(); // 페이지 번호 업데이트
    up_npn(); // 버튼 상태 업데이트
});

$(function() {
    let frld = true;
    let fimgfr = $('#main_visual .frame > img').eq(0);
    let smenu = $('#main_visual .mv_bmenu > li > .mv_smenu');

    if (bw <= 800) {
        setTimeout(() => {
            fimgfr.addClass('visible');
            $('#main_visual h3').addClass('start');
            $('#main_visual .mv_bmenu').addClass('start');

            if (frld) {
                smenu.eq(0).addClass('start');
                frld = false;

                // ✨ 1초 후에 start 클래스 제거
                setTimeout(() => {
                    $('#main_visual .mv_smenu').removeClass('start');
                }, 1000);
            }
        }, 700);
    }
});

//알림마당 등장 이벤트
$(document).ready(function () {
    let n_offset = $("#main_notice .n_title").offset().top;  // 요소의 위치
    let wdh = $(window).height(); // 창의 높이

    // 페이지가 새로 고침되었을 때 요소가 화면에 나타나면 바로 애니메이션 적용
    function ckview() {
        if ($(window).scrollTop() + wdh > n_offset) {
            setTimeout(function() {
                $(".n_title").addClass("n_start");
                $(".n_stitle").addClass("n_start");
                $(".n_list").addClass("n_start");

                setTimeout(function() {
                    $(".n_title").removeClass("n_title");
                    $(".n_stitle").removeClass("n_stitle");
                    $(".n_list").removeClass("n_list");
                }, 1000); // 1000ms 후에 클래스를 제거
            }, 500); // 500ms 후에 효과 적용
        }
    }

    // 새로 고침 시에도 처음에 해당 요소가 화면에 있을 경우 바로 적용
    ckview();

    // 스크롤 이벤트
    $(window).scroll(function () {
        ckview(); // 스크롤 중에 요소가 화면에 나타나면 애니메이션 적용
    });
});

// 주요산업 ul 너비 조정 함수
function upbw() {
    let bw = $(window).width(); // 현재 창 너비 확인
    let b_ul = $('#main_business .wrap > ul');
    let b_li = b_ul.children('li');

    if (bw > 800) {
        let bls = b_li.filter('.select');
        let blo = b_li.not('.select');

        bls.css('width', '74.5%');
        blo.css('width', '8%');
    }
};

// 최초 실행 시 너비 적용
$(function () {
    upbw();
});

$(window).resize(function () {
    upbw(); // 리사이즈마다 다시 판단해서 적용
});

// 주요산업 li 클릭이벤트
$(document).ready(function () {
    // 초기 표시 대상에는 b_instant 붙이기
    $('#main_business .wrap > ul > li.select .b_textbox').addClass('b_instant');
});

$('#main_business .wrap > ul > li').click(function () {
    if (bw > 800) {
        let th = $(this);
        let tb = th.find('.b_textbox');

        th.siblings().removeClass('select');
        th.addClass('select');

        upbw();

        // 기존 클래스 즉시 제거 (트랜지션 없음)
        $('.b_textbox').removeClass('b_start b_instant');

        // 리플로우 트리거
        void tb[0].offsetHeight;

        // 다음 프레임에 트랜지션 등장
        requestAnimationFrame(() => {
        tb.addClass('b_start');
        });
    }
});

//주요산업 등장 이벤트
$(document).ready(function () {
    let b_offset = $("#main_business .b_title").offset().top;  // 요소의 위치
    let wdh = $(window).height(); // 창의 높이

    // 페이지가 새로 고침되었을 때 요소가 화면에 나타나면 바로 애니메이션 적용
    function ckview() {
        if ($(window).scrollTop() + wdh > b_offset) {
            setTimeout(function() {
                $(".b_title").addClass("b_start");
                $(".b_stitle").addClass("b_start");
                $(".b_slide").addClass("b_start");

                setTimeout(function() {
                    $(".b_title").removeClass("b_title");
                    $(".b_stitle").removeClass("b_stitle");
                    $(".b_slide").removeClass("b_list");
                }, 1000); // 1000ms 후에 클래스를 제거
            }, 500); // 500ms 후에 효과 적용
        }
    }

    // 새로 고침 시에도 처음에 해당 요소가 화면에 있을 경우 바로 적용
    ckview();

    // 스크롤 이벤트
    $(window).scroll(function () {
        ckview(); // 스크롤 중에 요소가 화면에 나타나면 애니메이션 적용
    });
});

// 공사 참여 관련사이트 슬라이드
let tpn = 0; // 페이지 넘버
let tulwArr = []; // 각 li의 넓이를 담을 배열
let tck = 0; // 일시정지 체크용 변수들

// 각 li의 넓이를 계산하여 배열에 담기
$('#main_join .t_rs ul li').each(function() {
    tulwArr.push($(this).outerWidth(true)); // li의 넓이를 배열에 추가
});

function t_slide() {
    // 첫 번째 li의 넓이를 가져와서 슬라이드 애니메이션
    let slideWidth = tulwArr[0]; // 첫 번째 li의 넓이만큼 이동

    // 슬라이드 애니메이션
    $('#main_join .t_rs ul').animate({'left': -slideWidth}, 1000, function () {
        let firstChild = $(this).find('li:first-child');
        $(this).append(firstChild); // 첫 번째 li를 마지막으로 보냄
        $(this).css({'left': 0}); // 위치 초기화

        // 슬라이드 후, li의 넓이를 다시 계산
        tulwArr = [];
        $('#main_join .t_rs ul li').each(function() {
            tulwArr.push($(this).outerWidth(true)); // 다시 li의 넓이를 계산하여 배열에 추가
        });
    });
}

let t_timer = setInterval(t_slide, 7000); // 7초마다 슬라이드 전환

// 공사 참여 관련사이트 슬라이드 이전 버튼
$('#main_join .t_rsbtn .t_prev').click(function () {
    if (tck == 0) { 
        clearInterval(t_timer);
        t_timer = setInterval(t_slide, 7000); // 타이머를 재설정하여 자동 슬라이드가 계속 되도록
    }

    // 마지막 li의 넓이를 구함
    let tulw = $('#main_join .t_rs ul li:last-child').outerWidth(true); // 

    // 슬라이드 애니메이션
    $('#main_join .t_rs ul').css({'left': -tulw}).prepend($('#main_join .t_rs ul li:last-child')).animate({'left': 0}, 1000);  // 마지막 li를 맨 앞에 추가
});

// 공사 참여 관련사이트 슬라이드 다음 버튼
$('#main_join .t_rsbtn .t_next').click(function () {
    if (tck == 0) {
        clearInterval(t_timer);
        t_timer = setInterval(t_slide, 7000);
    }
    t_slide(); // 슬라이드 전환
});

// 공사 참여 관련사이트 슬라이드 재생/정지 토글 버튼
$("#main_join .t_rsbtn .t_toggle").click(function () {
    if (tck === 0) {
        tck = 1; // 일시정지 상태로 변경
        clearInterval(t_timer); // 타이머 정지
        $('#main_join .t_rsbtn .t_toggle img').attr('src', 'images/main_related_slide_btn_play.svg'); // 재생 버튼 이미지로 변경
    } else {
        tck = 0; // 재생 상태로 변경
        t_timer = setInterval(t_slide, 7000); // 슬라이드 재생
        $('#main_join .t_rsbtn .t_toggle img').attr('src', 'images/main_related_slide_btn_pause.svg'); // 일시정지 버튼 이미지로 변경
    }
});

//공사참여 등장 이벤트
$(document).ready(function () {
    let t_offset = $("#main_join .t_title").offset().top;  // 요소의 위치
    let wdh = $(window).height(); // 창의 높이

    // 페이지가 새로 고침되었을 때 요소가 화면에 나타나면 바로 애니메이션 적용
    function ckview() {
        if ($(window).scrollTop() + wdh > t_offset) {
            setTimeout(function() {
                $(".t_title").addClass("t_start");
                $(".t_stitle").addClass("t_start");
                $(".t_link").addClass("t_start");
                $(".t_blist").addClass("t_start");
                $(".t_slist").addClass("t_start");

                setTimeout(function() {
                    $(".t_title").removeClass("t_title");
                    $(".t_stitle").removeClass("t_stitle");
                    $(".t_link").removeClass("t_link");
                    $(".t_blist").removeClass("t_blist");
                    $(".t_slist").removeClass("t_slist");
                }, 1000); // 1000ms 후에 클래스를 제거
            }, 500); // 500ms 후에 효과 적용
        }
    }

    // 새로 고침 시에도 처음에 해당 요소가 화면에 있을 경우 바로 적용
    ckview();

    // 스크롤 이벤트
    $(window).scroll(function () {
        ckview(); // 스크롤 중에 요소가 화면에 나타나면 애니메이션 적용
    });
});

// footer 패밀리 사이트 팝업
let st = 0; // 스크롤 위치 저장용 변수

// 팝업 열기
$('footer .fsbtn').click(function() {
    st = $(window).scrollTop(); // 현재 스크롤 위치 저장
    $('body').css({
        position: 'fixed',
        top: -st + 'px',
        width: '100%'
    });

    $('.fs_popbox').fadeIn();
    $('.black').addClass('on');
    $('.black').off('click');
});

// 팝업 닫기
$('.fs_popbox .fsp_close').click(function() {
    $('.fs_popbox').fadeOut();
    $('.black').removeClass('on');

    $('body').css({
        position: '',
        top: '',
        width: ''
    });
    $(window).scrollTop(st); // 저장된 위치로 복원
});

// 팝업 내부 클릭 시 닫힘 방지
$('.fs_popbox').click(function(e) {
    e.stopPropagation();
});

// 탑버튼
$(function() {
    // 버튼 클릭 시 페이지 맨 위로 스크롤
    $('.go_top').click(function() {
        $('html, body').animate({scrollTop: 0}, 700);
        return false;
    });
});
