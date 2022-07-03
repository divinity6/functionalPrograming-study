/**
 * 프로그람 설명문서 주석
 * 2022.07. 03
 *
 *
 *           ===== 큐에서 처리할 작업을 큐에 넣기 =====
 *
 *      - 현재까지 모든 코드는 타임라인 하나에 있다
 *
 *      --> 큐에서 처리할 작업을 다른 타임라인으로 옮겨야 한다
 *      ----> 그러나, 그보다 먼저 큐에서 처리할 작업을 큐에 넣는 액션
 *            하나로 바꾸는 작업을 한다
 */
title( '큐에 추가하기' );
{
    title( '이전 코드' );
    try {
        function add_item_to_cart( item ){
            cart = add_item( cart , item );
            calc_cart_total( cart , update_total_dom );
        }

        function calc_cart_total( cart , callback ){
            var total = 0;
            cost_ajax( cart , function( cost ){
                total += cost;
                shipping_ajax( cart , function( shipping ){
                    total += shipping;
                    callback( total ); // 콜백으로 변경
                } )
            } )
        }
    }
    catch( e ){
        console.log( '큐에 넣기전 코드' );
        debugger;
    }
    /**
     *  - queue 에 넣기전 기본 코드
     */

    title( 'queue 에 넣은 새로운 코드' );
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
                    callback( total ); // 콜백으로 변경
                } )
            } )
        }

        var queue_items = [];

        function update_total_queue( cart ){
            queue_items.push( cart );
        }

        /**
         *  - 아직 완성되지 않았지만, update_total_queue()는
         *    큐가 추가하는 일 외에 다른 일을 할 것이다
         */
    }
    catch( e ){
        console.log( "큐에 넣은 코드" );
    }

    /**
     *  - 여기까지의 큐는 단순하다. 그냥 배열이다.
     *    queue 에 항목을 추가하는 것은 배열 끝에 항목을 추가하는
     *    간단한 코드이다
     */
}

/**
 *           ===== 큐에 있는 첫 번째 항목을 실행한다 =====
 *
 *      - 위 코드에서 이제 큐 끝에 항목을 추가했기 때문에 작업을 실행할 수 있다
 *      --> 작업을 실행하려면 큐( 순서가 관리되는 )
 *          가장 앞에 있는 항목을 꺼내 작업을 시작하면 된다
 */
title( '큐에 있는 항목 실행하기' );
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

    function runNext(){
      var cart = queue_items.shift(); // 배열의 첫 번째 항목을 꺼내 cart 에 넣는다
      calc_cart_total( cart , update_total_dom );
    };

    function update_total_queue( cart ){
        queue_items.push( cart );
        // 큐에 항목을 추가하고 큐 워커를 시작한다
        setTimeout( runNext , 0 ); // setTimeout 으로 이벤트 루프에 작업을 추가한다
    }

    /**
     *  - 아 , setTimeout 을 쓴 이유는 이벤트 루프에 작업을 추가하려고 넣은 거구나...
     *  --> 머리 개좋네 ㅋㅋㅋ
     *
     *  - 항목을 순서대로 처리해야 하지만, 동시에 두 항목이 처리되는 것을 막는 코드가 없다
     *  --> 모든 항목을 순서대로 가지고 있어서 한번에 하나씩 처리하면 된다
     */
}
catch( e ){
    console.log( "큐에 있는 코드 실행하기" );
}
