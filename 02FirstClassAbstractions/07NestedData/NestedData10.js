/**
 * 프로그람 설명문서 주석
 * 2022.06. 25
 *
 *
 *           ===== 중첩된 데이터에 추상화의 벽 사용 =====
 *
 *      - 깊이 중첩된 데이터를 사용할 때 너무 많은 것을 기억해야하는 어려움이 있었다
 *      --> 중첩된 각 단계의 데이터 구조를 모두 기억해야 한다
 *      --> 같은 작업을 하며 알아야할 데이터 구조를 줄이는 것이다
 *
 *      - 추상화의 벽에 함수를 맨들고 의미있는 이름을 붙여주는 것
 *        ( 추상화의 벽을 맨들때는 사용하려는 데이터의 이해도를 높일 수 있는 방향으로 )
 */
title( '깊이 중첩된 데이터에 추상화의 벽 사용' )
{
    title( '추상화의 벽 없음' );
    try{
        httpGet( 'http://my-blog.com/api/category/blog' , function( blogCategory ){
            // 중첩된 객체
            // 긴 키경로
            // 바꾸는 함수
            renderCategory( nestedUpdate( blogCategory , [ 'posts' , '12' , 'author' , 'name' ] , capitalize ) )
        } )
        /**
         *  - 알아야할 정보가 너무많음
         *
         *  - 블로그 API 로 blog 라는 분류에 있는 값을 JSON 으로 가져와 콜백( blogCategory )에서 처리하는 코드
         *
         *  1. 각 분류는 posts 키 아래 블로그 글을 담고 있다
         *
         *  2. 각 블로그 글은 ID를 통해 접근할 수 있다
         *
         *  3. 블로그 글은 author 키 아래 글쓴이 사용자 레코드를 담고 있다
         *
         *  4. 각 사용자 레코드는 name 키 아래 사용자 이름을 담고 있다
         *
         *  - 즉 , 경로에 따라 알아야할 정보가 너무 많다
         */
    }
    catch( e ){
        console.log( '알아야할 데이터 구조가 너무많다...' )
    }

    title( '추상화의 벽 사용 - 주어진 ID로 블로그를 변경하는 함수' );
    {
        /**
         * @name updatePostById - 명확한 이름
         * @param category
         * @param id
         * @param modifyPost - 분류에 있는 블로그 글이 어떤 구조인지 몰라도 함수 사용 가능
         */
        function updatePostById( category , id , modifyPost ){
            return nestedUpdate( category , [ 'post' , 'id' ] , modifyPost );
        }

        /**
         *  - [ 'post' , 'id' ] 분류의 구조같은 구체적인 부분은 추상화의 벽 뒤로 숨김
         *
         *  - 블로그 글 구조에 대해서는 콜백( modifyPost )에 맡긴다
         */
    }
    title( '추상화의 벽 사용 - 글쓴이를 수정하는 함수' );
    {
        /**
         * @name updateAuthor - 명확한 이름
         * @param post
         * @param modifyUser - 블로그 글 안에 글쓴이가 어떤 구조로 저장되어 있는지 몰라도 함수 사용 가능
         */
        function updateAuthor( post , modifyUser ){
            return update( post , 'author' , modifyUser );
        }

        /**
         *  - 사용자를 처리하는 방법은 modifyUser 가 알고 있다
         */
    }

    title( '추상화의 벽 사용 - 사용자의 이름을 대문자로 변경' );
    try {
        /**
         * @name capitalizeName - 명확한 이름
         * @param user
         *
         * - 'name' capitalizeName 를 사용할때 키를 몰라도 된다
         */
        function capitalizeName( user ){
            return update( user , 'name' , capitalize );
        }
    }
    catch( e ){
        console.log( 'capitalize 선언하지 않음' )
    }

    title( '추상화의 벽 사용 - 모두 합친 결과' );
    try{
        updatePostById( blogCategory , 12 , function( post ){
            return updateAuthor( 12 , capitalizeName );
        } )
    }
    catch( e ){
        console.log( '모두 합쳐서 사용' )
    }
    /**
     *  - 와, 무친... updatePostById 이걸 쓰니깐, 사용자가 알아야할 정보도 줄고,
     *    각 동작들의 이름으로 기억하기가 쉬워졌네....
     */

}

/**
 *  - 위의 코드는 두가지 이유때문에 더 좋아졌다
 *
 *  1. 기억해야할 것이 4가지에서 3가지로 줄어들음
 *
 *  2. 각 동작에 이름이 있기 때문에 각각의 동작을 기억하기 쉬움
 *
 *  --> 단지 분류안에 블로그 글이 있다는 것을 알고 있음
 *      ( but, 어떤 키에 들어있는지 기억하지 않아도 됨 )
 *
 *  --> 블로그 글에 글쓴이가 하나 있다는 것만 알면 되고 어떻게 저장되어 있는지는
 *      몰라도 됨
 */