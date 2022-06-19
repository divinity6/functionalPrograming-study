/**
 * 프로그람 설명문서 주석
 * 2022.06. 19
 *
 *
 *           ===== 강력한 reduce 그리고 데이터 =====
 *
 *      - reduce 로는 많은 일을 할 수 있고,
 *        그중 값을 맨드는 것을 할 수도 있다
 *
 *      - 체이닝을 쉽게하기위해서는 값을 데이터로 맨드는게 중요하다
 *        ( 메서드 이름이나, 추가동작등도 모두 데이터형식으로 이름을 갖고 있는등... )
 *
 */

title( '체이닝을 데이터로 맨들기' );
{
    title( '함수형 도구' )
    function reduce( array , init, f ){
        var accum = init;
        array.forEach( item => {
            accum = f( accum , item );
        } );
        return accum;
    }

    title( '고객이 추가한 제품들의 기록을 이용해 장바구니를 맨듬' );
    {
        var itemAdded = [ 'shirt' , 'shoes' , 'shirt' , 'socks' , 'hat' ];

        var shoppingCart = reduce( itemAdded , {} , addOne );

        function addOne( cart , item ){
            if ( !( cart[ item ] ) ){
                return add_item( cart , { name : item , quantity : 1 , price : priceLookup( item ) } )
            }
            else {
                var quantity = cart[ item ].quantity;
                return setFieldByName( cart , cart[ item ].name , 'quantity' , quantity + 1 );
            }
        }

        function add_item( cart , item ){
            return add_element_last( cart , item );
        }

        function setFieldByName( cart , name , field , value ){
            var item = cart[ name ];
            var newItem = objectSet( item , field , value );
            var newCart = objectSet( cart , name , newItem );
            return newCart;
        }

        /**
         *  - 위의 코드는 잘맨든 코드이지만 제품을 삭제하는 경우의 처리는 하지 않았다
         *  --> 고객이 제품을 추가했는지, 삭제했는지 알려주는 값과 제품에 대한 값을 함께 기록하면
         *      고객이 제품을 삭제한 겨우에도 처리할 수 있다
         */
    }
    title( '제품을 추가( add )한 경우오 삭제( remove )한 경우 모두 처리가능' );
    {
        var itemOps = [
            [ 'add' , 'shirt' ] , [ 'add' , 'shoes' ] , [ 'remove' , 'shirt' ] ,
            [ 'add' , 'socks' ] , [ 'remove' , 'hat' ]
        ]

        var shoppingCart = reduce( itemOps , {} , function( cart , itemOp ){
            var op = itemOp[ 0 ];
            var item = itemOp[ 1 ];

            if ( 'add' === op ){
                return addOne( cart , item );
            }
            if ( 'remove' === op ){
                return removeOne( cart , item );
            }
        } );

        function removeOne( cart , item ){
            if ( !( cart[ item ] ) ){
                return cart;
            }
            else {
                var quantity = cart[ item ].quantity;
                // 제품이 하나일때는 제거
                if ( 1 === quantity ){
                    remove_item_by_name( cart , item );
                }
                // 그렇지 않을 경우 수량을 줄임
                else {
                    return setFieldByName( cart , cart[ item ].name , 'quantity' , quantity - 1 );
                }
            }
        }

        function remove_item_by_name( cart , name ){
            return objectDelete( cart , name );
        }

    }
    /**
     *  - 인자를 데이터로 표현하는 것이 매우 중요한 기술이다
     *  --> 배열( itemOps )에 동작 이름( 'add' )과 제품 이름( 'shirt' )인 인자를 넣어
     *      동작을 데이터로 표현했다
     *
     *  --> 인자를 데이터로 맨들면 함수형 도구를 체이닝하기 좋다
     *
     *  --> 체이닝시 리턴할 데이터를 다음단계의 인자처럼 쓸 수 있도록 맨들어버릇해야한다
     */




}