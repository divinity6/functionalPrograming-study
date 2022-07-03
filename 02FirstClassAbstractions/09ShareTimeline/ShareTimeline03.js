/**
 * 프로그람 설명문서 주석
 * 2022.07. 03
 *
 *
 *           ===== 두 번째 타임라인이 첫 번째 타임라인과 동시에 실행되는 것을 막기 =====
 *
 *      - 지금까지 맨든 코드는 두 타임라인이 섞이는 것을 막지 못한다
 *      --> 한번에 하나씩만 실행하도록 맨들어야 한다
 *      --> 이미 실행되는 작업이 있는지 확인하여 두 타임라인이 섞이지 않도록 맨들어야 한다
 */
title( '동시 실행을 막기' );
try{
    function add_item_to_cart( item ){
        cart = add_item( cart , item );
        update_total_queue( cart );
    }

    function calc_cart_total( cart , callback ){
        var total = 0;
        cost_ajax( cart , function( cost ){
            total += cost;
            shipping_ajax( cart , function( shipping ){
                total += shipping;
                callback( total );
            } )
        } )
    }

    var queue_items = [];

    var working = false; // 현재 동작하고 있는 다른 작업이 있는지 확인한다

    function runNext(){
        // 동시에 두 개가 동작하는 것을 막을 수 있다
        if ( working ){
            return ;
        }

        working = true;

        var cart = queue_items.shift();

        calc_cart_total( cart , update_total_dom );
    };

    function update_total_queue( cart ){
        queue_items.push( cart );
        setTimeout( runNext , 0 );
    }

    /**
     *  - 두 타임라인이 동시에 실행되지는 않지만,
     *    항상 하나만 실행될 것이다.
     *  --> 현재 작업이 끝났을 경우, 다음 작업이 실행될 수 있도록
     *      고쳐야 한다
     */
}
catch( e ){
    console.log( "큐에 있는 코드 실행하기" );
}

/**
 *           ===== 다음 작업을 시작할 수 있도록 calc_cart_total() 콜백 함수를 고쳐본다 =====
 *
 *      - calc_cart_total() 에 새로운 콜백을 전달해 본다
 *      --> 작업 완료( working = false )를 기록하고 다음 작업을
 *          실행할 수 있도록 고쳐본다
 */
title( '다음 작업을 시작할 수 있게 하기' );
try{

    var queue_items = [];

    var working = false;

    function runNext(){
        if ( working ){
            return ;
        }

        working = true;

        var cart = queue_items.shift();

        // 작업 완료를 표시하고 다음 작업을 시작한다
        calc_cart_total( cart , function( total ){
            update_total_dom( total );
            working = false;
            runNext(); // 여기서 다시실행하는구만...
        } );
    };

    function update_total_queue( cart ){
        queue_items.push( cart );
        setTimeout( runNext , 0 );
    }

    /**
     *  - 와, 머리 개잘썻네... 그치 그냥 앞에서는 return 때려버리면
     *    그 컨텍스트는 죽어버리고,
     *  --> 그다음 내부에서 runNext 를 실행해버리면 강제로 다음게 실행되지...
     *
     *  --> 이게 큐지...
     *
     *  ----> 이거 JS 의 이터레이터 오브젝트랑 제너레이터로 구현할 수 있겠는데?
     *
     *   - 이제 배열에 있는 모든 항목을 반복할 수 있다.
     *     하지만, 문제가 있다
     *     ( 배열이 비어있을 때, 멈추지 않는다는 것이다 )
     */
}
catch( e ){
    console.log( "다음 작업을 시작할 수 있게 하기" );
}


/**
 *           ===== 항목이 없을 때 멈추게 하기 =====
 *
 *      - 큐 워커는 기본적으로 큐가 바닥날 때까지 실행한다.
 *      --> 빈 큐에서 queue_items.shift()를 호출하면
 *          undefined 가 나올 것이다
 */
title( '항목이 없을때 멈추게 하기' );
try{

    var queue_items = [];

    var working = false;

    function runNext(){
        if ( working ){
            return ;
        }

        // queue 가 비어있을 경우 멈추게 하기
        if ( queue_items.length === 0 ){
            return ;
        }

        working = true;

        var cart = queue_items.shift();

        calc_cart_total( cart , function( total ){
            update_total_dom( total );
            working = false;
            runNext();
        } );
    };

    function update_total_queue( cart ){
        queue_items.push( cart );
        setTimeout( runNext , 0 );
    }

    /**
     *  - 잘 동작하는 queue 가 생겼다. 사용자가 아무리 빠르게 클릭하더라도
     *    순서대로 처리할 수 있다
     *
     *  --> 이제 queue 코드의 전역변수 2개를 없앨 차례다
     */
}
catch( e ){
    console.log( "항목이 없을때 멈추게 하기" );
}

/**
 *           ===== 변수와 함수를 함수 범위로 넣기 =====
 *
 *      - 지금 코드는 두 개의 전역변수를 변경한다
 *      --> Queue() 라는 함수에 전역변수와 사용하는 함수를 넣어
 *          다른 곳에서 접근할 수 없도록 한다
 *
 *      - 사용자는 update_total_queue() 만 필요하기 때문에,
 *        Queue()의 리턴 값을 update_total_queue 변수에 할당해서 사용하면 된다
 */

title( '변수와 함수를 함수 범위로 넣기' );
try{
    // 모든 코드들을 Queue()에 넣는다
    function Queue(){

        // 전역 변수들이 지역 변수로 바뀐다
        var queue_items = [];

        var working = false;

        function runNext(){
            if ( working ){
                return ;
            }

            if ( queue_items.length === 0 ){
                return ;
            }

            working = true;

            var cart = queue_items.shift();

            calc_cart_total( cart , function( total ){
                update_total_dom( total );
                working = false;
                runNext();
            } );
        };

        // Queue()는 큐에 항목을 넣을 수 있는 함수를 리턴한다
        return function update_total_queue( cart ){
            queue_items.push( cart );
            setTimeout( runNext , 0 );
        }
    }

    // 리턴된 함수를 원래 함수처럼 사용할 수 있다
    var update_total_queue = Queue();

    /**
     *  - 모든 전역변수를 Queue() 범위로 넣었기 때문에 더는 Queue() 밖에서 변경할 수 없다
     *  --> 그리고 Queue()는 작은 코드이므로 전역변수에 접근하는 코드도 많지 않다
     *
     *  --> 또한, queue 를 여러개 맨들 수 있게 되었다
     *      but, 모두 장바구니에 제품을 추가하는 일을 한다
    */
}
catch( e ){
    console.log( "함수안에서 리턴" );
}

/**
 *  - 자원을 공유하기위해 queue 를 맨들었다.
 *  --> 줄을 서는 것은 일반적이지만, 모든 경우에 좋은 것은 아니다
 *      ( 기다려야 한다는 단점이 있다 )
 *
 *  예)
 *
 *  1. 한번에 한 명씩만 쓸 수 있게 화장실 문을 잠글 수 있다
 *
 *  2. 공공 도서관( 책이 모인 곳 )은 지역사회가 많은 책을 공유할 수 있는 곳이다
 *
 *  3. 칠판을 사용하면 선생님( 기록하는 사람 ) 한명이 교실 전체( 읽는 사람 )에 정보를 공유할 수 있다
 *
 *  - 자원을 공유하는 프로그람을 맨든다면 이런 것을 모두 사용해 볼 수 있다
 */