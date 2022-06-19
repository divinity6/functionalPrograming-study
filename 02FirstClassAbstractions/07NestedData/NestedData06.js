/**
 * 프로그람 설명문서 주석
 * 2022.06. 19
 *
 *
 *           ===== nestedUpdate() 도출하기 =====
 *
 *      - update4 , update5 를 맨들면서 어떤 패턴이 존재한다는 것을 파악했다
 *      --> 중첩된 개수에 상관없이 쓸 수 있는 nestedUpdate()를 맨들어 본다
 *
 *      --> 패턴은 간단하다 updateX() 를 맨들려면 update()안에 updateX-1()을 불러주면 된다
 *      ----> update()는 첫 번째 키만 사용하고 나머지 키와 modify 함수는 updateX-1()을 사용한다
 *
 *      - p 375
 */

title( 'nestedUpdate() 도출하기' );
{
}
