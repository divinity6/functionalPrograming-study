/**
 * 프로그람 설명문서 주석
 * 2022.06. 06
 *
 *
 *           ===== 함수형 반복 연습 =====
 *
 *      - map 이랑 filter , reduce 등을 쓰면서 거기에 거르거나,
 *        추가해야할 기능들이 필요할 때가 있었는데, 그때는 이거를 한번더
 *        추상화 해서 사용하면 되는구나!!
 *
 */

title( '함수형 반복 연습' );
{
    const customers = [
        { firstName : '전' , lastName: "훈" , address : '주소는여기에요'  , id : 1 , age : '31' , company : 'remarkablesoft' },
        { firstName : '심' , lastName: "랑" , address : '주소는여기에요2' , id : 2 , age : '27' , company : 'gwangju' },
        { firstName : '심' , lastName: "랑" , address : '주소는여기에요3' , id : 3 , age : '27' , company : 'namyang' },
        { firstName : '신' , lastName: "성" , address : '주소는여기에요4' , id : 3 , age : '31' , company : 'yeosu' },
        { firstName : '정' , lastName: "슬" , address : '주소는여기에요5' , id : 2 , age : '27' , company : 'yang' },
    ];

    title( 'map 연습' );
    {
        function map( array , f ){

            var newArray = [];
            array.forEach( function( item ){
                newArray.push( f( item ) );
            } );
            return newArray;
        }

        function map( array , f ){
            return array.map( item => f( item ) );
        }

        const newArr = map( customers , function( customer ){
            return {
                firstName : customer.firstName,
                lastName : customer.lastName,
                address : customer.address
            }
        } );

        const newArr2 = customers.map( ( { firstName , lastName , address } ) => {
            return { firstName, lastName, address } } )

        console.log( newArr ,newArr2 );
    }

    debugger;
    // 오... 이렇게도 쓸수 있구나 - map 을쓰면서 원하는 값만 리턴시켜버릴 수도 있네...ㅋㅋ

    title( 'filter 연습' );
    {
        function filter( array , f ){
            var newArray = [];
            array.forEach( item => {
                if ( f( item ) ){
                    newArray.push( item );
                }
            } );
            return newArray;
        }

        const newArr = filter( customers , function( customer ){
            return customer.id % 3 === 0;
        } );
        const newArr2 = customers.filter( ( { id } ) => id % 3 === 0 );

        console.log( newArr , newArr2 );
    }
    debugger;

    const numbers = [ 1 , 2 , 3 , 4 , 5 ];

    function reduce( array , init, f ){
        var accum = init;
        array.forEach( item => {
            accum = f( accum , item );
        } );
        return accum;
    }
    title( 'reduce 연습' );
    {
        function sum( numbers ){
            return reduce( numbers , 0 , function( accum , number ){
                return accum + number;
            } );
        }

        function product( numbers ){
            return reduce( numbers , 0 , function ( accum , number ){
                return accum * number;
            } )
        }



        const newNum = sum( numbers );
        const newNum2 = numbers.reduce( ( prev , cur ) => prev + cur );
        console.log( newNum , newNum2 );
    }
    debugger;
    title( 'reduce 연습2' );
    {
        function min( numbers ){
            return reduce( numbers , Number.MAX_VALUE , function ( prev , next ){
                if ( prev < next ){
                    return prev;
                }
                else {
                    return next;
                }
            } );
        }

        function max( numbers ){
            return reduce( numbers , Number.MIN_VALUE , function ( prev , next ){
                if ( prev < next ){
                    return next;
                }
                else {
                    return prev``;
                }
            } );
        }

        const newMin = min( numbers );
        const newMin2 = numbers.reduce( ( prev , cur ) => {
            if ( prev < cur ){
                return prev;
            }
            else {
                return cur;
            }
        } );
        console.log( newMin , newMin2 );
    }
    // reduce 2번째는 진짜 좋네...

    /**
     *  - 결국 빌트-인 JS 에서 제공하는 메서드들을 한번 묶어서 사용하는게 좋다는 거네...
     *
     *  - 와 , 근데 reduce 메서드는 잘 사용안했던건데, 앞으로 매니매니 사용해야것다...
     *  --> reduce 로 map 이나, filter 처럼 맨들수 있지만,
     *      map 이나 filter 는 reduce 처럼 맨들수가 없음...
     *
     *  --> 위에서 맨든 reduce 는 각 원소를 하나씩 돌지만, 실제 js reduce 는
     *      맨처음에 2개를 한꺼번에 도니 한번더 감싸야겟네
     */


     title( 'reduce 로 map 과 filter 맨들기' );
    {
        function _reduce( array , init, f ){
            var accum = init;
            array.forEach( item => {
                accum = f( accum , item );
            } );
            return accum;
        }

        function _map( array , f ){
            return _reduce( array , [] , function( newArr , item  ){
                newArr.push( item );
                return newArr;
            } );
        }

        function _filter( array , f ){
            return _reduce( array , [] , function( newArr , item ){
                if ( f( item ) ){
                    newArr.push( item );
                }
                return newArr;
            } );
        }

        // js 기본 reduce 로 filter 맨들기
        function $filter( array , f ){
            var newArr = [];
            // 그치 이렇게 해야 prototyping 이 되지...
            newArr.__proto__ = Object.create( Array.prototype , {
                pushNewArr : {
                    value : function( item , f ){
                        if ( f( item ) ){
                            this.push( item );
                        }
                    },
                },
            } );

            array.reduce( ( prev , cur , index ) => {
                if ( 0 === index ){
                    newArr.pushNewArr( prev , f );
                }
                newArr.pushNewArr( cur , f );
            } );
            return newArr;
        }

        const newArr = $filter( numbers , function( item ){
            return item > 2;
        } );

        console.log( newArr );
        debugger;
    }
}

/**
 *           ===== 정리 =====
 *
 *      - js 에서 기본 제공하는 빌트인 객체를 전역적으로 사용할 수 있도록 잘
 *        wrapping 해서 사용하는 것이 중요하다
 *        ( lodash 에서 많이 제공하네... )
 *
 *      - map() 은 어떤 배열의 모든 항목에 함수를 적용해 새로운 배열로 바꾼다
 *
 *      - filter() 는 어떤 배열의 하위 집합을 선택해 새로운 배열을 맨든다
 *
 *      - reduce() 는 초깃값을 가지고 어떤 배열 항목을 조합해 하나의 값을 맨든다
 *
 */