/**
 * 프로그람 설명문서 주석
 * 2022.07. 03
 *
 *
 *           ===== done() 함수 빼내기 =====
 *
 *      - 큐 코드를 완전히 재사용할 수 있게 맨들려고 한다
 *      --> 지금은 장바구니에 제품을 추가하는 기능에 특화되어 있다
 *      ----> 하지만, 함수 본문을 콜백으로 바꾸기( replace boy with callback )
 *            리팩터링으로 큐를 반복해서 처리하는 코드( runNext()를 부르는 코드 )
 *            와 큐에서 하는 일( calc_cart_total()을 부르는 코드 )을 분리할 수 있다
 */
title( 'done() 함수 빼내기' );
try{
    function Queue(){

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

            // 원래 cart 를 사용하지 않고 cart 를 인자로 받아 지역적으로 사용한다
            function worker( cart , done ){ // done 은 콜백 함수 이름이다
                calc_cart_total( cart , function( total ){
                    update_total_dom( total );
                    done( total );
                } );
            }

            // 새로운 함수로 빼낸다
            worker( cart , function(){
                working = false;
                runNext();
            } );
        };

        return function update_total_queue( cart ){
            queue_items.push( cart );
            setTimeout( runNext , 0 );
        }
    }

    var update_total_queue = Queue();

    /**
     *  - 와, 이렇게 보니까 진짜 이터레이터 오브젝트랑 똑같네 ㅋㅋㅋ
     *
     *  - done() 콜백으로 큐 타임라인 작업을 이어서 할 수 있다
     *  --> 콜백 함수에서 working 값을 false 로 설정하고
     *      다음 작업을 실행하기 위해 runNext() 를 부른다
     *
     *  - 이렇게 되면 worker 함수는 의존하는 것이 없어서,
     *    Queue() 밖으로 빼서 Queue() 인자로 전달할 수 있다
     */

}
catch( e ){
    console.log( "done() 함수 빼내기" );
}

/**
 *           ===== 워커 행동을 바꿀 수 있도록 밖으로 빼기 =====
 *
 *      - 아직 큐는 장바구니에 제품을 추가하는 일만 할 수 있다
 *
 *      --> 그러나 특정한 동작을 하는 큐가 아닌, 일반적인 큐가 필요할 수 있다
 *
 *      --> 일반적인 큐를 맨들면 많은 동작에 재사용할 수 있다
 *
 *      ----> 함수를 인자로 빼는 리팩터링으로 특정한 행동을 하는 코드를 없애고,
 *            큐가 생성될 때 원하는 행동을 전달할 수 있다.
 */

title( '일급 함수로 빼내기' );
try{
    // 실행할 함수를 새로운 인자로 추가한다
    function Queue( worker ){

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

            // 인자로 넘겨받는다
            worker( cart , function(){
                working = false;
                runNext();
            } );
        };

        return function update_total_queue( cart ){
            queue_items.push( cart );
            setTimeout( runNext , 0 );
        }
    }

    // 인자로 넣기
    var update_total_queue = Queue( calc_cart_worker );

    function calc_cart_worker( cart , done ){
        calc_cart_total( cart , function( total ){
            update_total_dom( total );
            done( total );
        } );
    }

    /**
     *  - Queue() 에 있는 기능은 모두 일반적인 기능이다
     *  --> 원하는 모든 동작은 인자로 넘길 수 있다
     *
     *  ----> 이걸로 ctrl z 도 구현할 수 있겠는데...??
     */
}
catch( e ){
    console.log( "일급 함수로 빼내기" );
}

/**
 *           ===== 작업이 끝났을 때 실행하는 콜백을 받기 =====
 *
 *      - 작업이 끝났을 때 실행하는 설정기능이 필요할 수 있다
 *      --> 추가 정보는 작업 데이터와 콜백을 작은 객체로 맨들어 큐에 넣을 수 있다
 */

title( '작업 완료 콜백 받기' );
try{
    function Queue( worker ){

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

            var item = queue_items.shift();

            // worker 에는 데이터만 전달한다
            worker( item.data , function(){
                working = false;
                runNext();
            } );
        };

        return function( data , callback ){
            // 배열에 데이터와 콜백을 모두 넣는다
            queue_items.push( {
                data : data,
                callback : callback || function(){}
            } );
            setTimeout( runNext , 0 );
        }
    }

    var update_total_queue = Queue( calc_cart_worker );

    function calc_cart_worker( cart , done ){
        calc_cart_total( cart , function( total ){
            update_total_dom( total );
            done( total );
        } );
    }

    /**
     *  - 작업이 끝났을 때 실행되는 콜백을 데이터와 함께 저장했다
     *  --> but, 아직 콜백을 사용하진 않았다
     */
}
catch( e ){
    console.log( "작업 완료 콜백 받기" );
}

/**
 *           ===== 작업이 완료되었을 때 콜백 부르기 =====
 *
 *      - 작업이 끝났을 때, 콜백 부르기
 */

title( '작업이 완료되었을 때 콜백 부르기' );
try{
    // Queue() 는 일반적인 함수이기 때문에 가능한 일반적인 이름을 사용한다
    function Queue( worker ){

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

            var item = queue_items.shift();

            // done() 이 인자를 받을 수 있도록 맨든다
            worker( item.data , function( val ){ // 이 콜백은 done 함수임
                working = false;
                // item.callback 을 비동기로 호출
                setTimeout( item.callback , 0 , val ); // 콜백에 인자를 전달
                runNext();
            } );
        };

        return function( data , callback ){
            queue_items.push( {
                data : data,
                callback : callback || function(){}
            } );
            setTimeout( runNext , 0 );
        }
    }

    var update_total_queue = Queue( calc_cart_worker );

    // cart 에는 제품 데이터가 들어있고, done 은 완료될때 부르는 함수이다
    function calc_cart_worker( cart , done ){

        // 이 함수는 어떤 값을 사용하는지 알기 때문에 일반적인 이름이 아니고 구체적인 이름을 사용한다
        calc_cart_total( cart , function( total ){
            update_total_dom( total );
            done( total );
        } );
    }

    /**
     *  - Queue() 코드에서 item.data 와 val 이름을 잘 보면, 이제 Queue()는 일반적인 함수라서
     *    어떤 데이터를 사용할지 모른다
     *
     *  --> 따라서, item.data 와 val 은 일반적인 이름을 사용했다
     *
     *  --> 하지만, calc_cart_worker() 에서는 같은 값의 변수에 cart 와 total 이라는 이름을 사용했다
     *      ( calc_cart_worker()는 이 값이 어떤 값으로 사용할지 알기 때문이다 )
     *
     *  - 변수명은 구체화 단계에 따라 하는 일을 표현해야 한다
     *
     *  ----> 이거를 이터러블 오브젝트, 제너레이터 함수로 맨들어서 사용하자!!
     */
}
catch( e ){
    console.log( "작업 완료 콜백 받기" );
}

/**
 * - 이제 큐는 재사용하기 정말 좋다!!
 * --> 큐를 거치는 모든 작업을 처리하고, 작업이 완료되면 타임라인이 이어서 작업을 계속한다!!
 *
 * - Queue 는 순서가 섞일 수 있는 여러 타임라인을 하나의 통일된 타임라인으로 바꿔준다
 * --> Queue() 는 액션에 순서보장( guaranteeing order ) 슈퍼파워를 주는 도구로 볼 수 있다
 *
 * - Queue 대신 linearize() 라고도 할 수 있다
 * --> Queue 가 액션 호출을 순서대로 맨들기 때문이다
 *
 * - 내부적으로 Queue 를 사용하지만, 큐를 사용한다는 것은 내부구현일 뿐이다
 *
 * @Queue 는 동시성 기본형( concurrency primitive )이다
 * --> 여러 타임라인을 올바르게 동작하도록 맨드는 재사용 가능한 코드이다
 *
 * --> 동시성 기본형은 방법은 다르지마느 모두 실행 가능한 순서를 제한하면서 동작한다
 *     ( 기대하지 않는 실행 순서를 없애면 코드가 기대한 순서로 동작한다는 것을 보장할 수 있다 )
 *
 * @동시성기본형 : concurrency primitive
 * --> 자원을 안전하게 공유할 수 있는 재사용 가능한 코드
 */