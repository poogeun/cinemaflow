# 🎬 CinemaFlow

> **영화 상영 정보부터 좌석 선택, 예매 관리까지 연결하는 풀스택 영화 예매 플랫폼**

<br />

<p>
  고객용 모바일 앱, 관리자용 웹 콘솔, Express API 서버를 하나의 흐름으로 연결한 영화 예매 프로젝트입니다.
</p>

<p>
  <sub>
    단순 영화 목록 조회를 넘어, 영화 탐색 → 상영 시간 선택 → 좌석 예매 → 관리자 운영 관리까지 이어지는 실제 영화관 예매 프로세스를 구현하는 것을 목표로 했습니다.
  </sub>
</p>

---

## 📸 화면 구성

<details>
<summary><strong>고객 앱 화면</strong></summary>

<br />

<table>
  <tr>
    <td width=25%>
      <strong>영화 목록</strong><br />
      <img src=./docs/images/customer-movies.png width=100% />
    </td>
    <td width=25%>
      <strong>영화 상세</strong><br />
      <img src=./docs/images/customer-movie-detail.png width=100% />
    </td>
    <td width=25%>
      <strong>상영 시간 선택</strong><br />
      <img src=./docs/images/customer-screenings.png width=100% />
    </td>
    <td width=25%>
      <strong>좌석 선택</strong><br />
      <img src=./docs/images/customer-seats.png width=100% />
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>관리자 웹 화면</strong></summary>

<br />

<table>
  <tr>
    <td width=50%>
      <strong>Dashboard</strong><br />
      <img src=./docs/images/admin-dashboard.png width=100% />
    </td>
    <td width=50%>
      <strong>Movies</strong><br />
      <img src=./docs/images/admin-movies.png width=100% />
    </td>
  </tr>
  <tr>
    <td width=50%>
      <strong>Screenings</strong><br />
      <img src=./docs/images/admin-screenings.png width=100% />
    </td>
    <td width=50%>
      <strong>Reservations</strong><br />
      <img src=./docs/images/admin-reservations.png width=100% />
    </td>
  </tr>
</table>

</details>

---

<details>
<summary><strong>📌 프로젝트 소개</strong></summary>

<br />

CinemaFlow는 영화 예매 흐름을 통합 관리하기 위한 풀스택 영화 예매 플랫폼입니다.

고객 앱에서는 영화 목록 조회, 상영 시간 선택, 좌석 예매를 제공하고, 관리자 웹에서는 영화, 상영관, 상영 일정, 예매 현황을 관리할 수 있습니다.

</details>

---

<details>
<summary><strong>🛠 기술 스택</strong></summary>

<br />

### Customer App

- Expo
- React Native

### Admin Web

- React
- Vite
- Material UI (MUI)

### Backend

- Node.js
- Prisma
- PostgreSQL
- JWT

</details>

---

<details>
<summary><strong>✨ 주요 기능</strong></summary>

<br />

### 고객 앱

- 회원가입 및 로그인
- 영화 목록 조회
- 영화 상세 정보 확인
- 영화별 상영 시간 선택
- 좌석 선택 후 예매
- 내 예매 내역 확인 및 취소

### 관리자 웹

- 관리자 로그인
- 영화 CRUD
- TMDB 영화 동기화
- 상영관 등록 및 좌석 구성 관리
- 상영 일정 생성, 수정, 삭제
- 자동 상영 스케줄 미리보기 및 확정
- 전체 예매 현황 조회

### API 서버

- JWT 기반 인증
- 관리자 권한 검증
- 영화 / 상영관 / 상영 일정 / 예매 도메인 API
- Prisma 기반 데이터 관리

</details>

---

<details>
<summary><strong>🔗 외부 API 및 서비스 연동</strong></summary>

<br />

### TMDB API

상영 영화 정보를 동기화하고, 영화 제목, 줄거리, 러닝타임, 포스터, 개봉일 정보를 저장합니다.

<img src=./docs/images/tmdb-sync.png width=70% />


</details>

---

<details>
<summary><strong>🎬 시연 플로우</strong></summary>

<br />

### 고객 예매

1. 고객이 영화 목록 조회
2. 영화 상세 화면에서 상영 시간 선택
3. 좌석 선택
4. 예매 완료
5. 내 예매 내역 확인

### 관리자 운영

1. 관리자 로그인
2. TMDB 영화 동기화
3. 상영관 및 좌석 정보 등록
4. 상영 일정 생성 또는 자동 편성
5. 예매 현황 확인

</details>

---

## 🎯 프로젝트 목표

<sub>
영화 예매 서비스의 고객 경험과 관리자 운영 흐름을 함께 설계하고, 모바일 앱 / 관리자 웹 / API 서버가 연결되는 실무형 풀스택 구조를 경험하는 것을 목표로 했습니다.
</sub>
