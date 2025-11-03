import { pool } from "../db.config.js";

// 타입 인터페이스
export interface AddUserData {
  email: string;
  name: string;
  password: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phoneNumber: string;
}

export interface AddRestaurantData {
  name: string;
  categoryId: number;
  address: string;
  regionId: number;
}
export interface AddReviewData {
  restaurantId: number;
  userId: number;
  rate: number;
  reviewText: string;
}

export interface AddMissionData {
  restaurantId: number;
  minCost: number;
  deadline: Date;
}

export interface AddUserMissionData {
  missionId: number;
  userId: number;
}


// User 데이터 삽입
export const addUser = async (data: AddUserData): Promise<number | null> => {
  const conn = await pool.getConnection();

  try {
    const [confirm]: any = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      data.email
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result]: any = await pool.query(
      `INSERT INTO user (email, name, password, gender, birth, address, detail_address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.password,
        data.gender,
        data.birth,
        data.address,
        data.detailAddress,
        data.phoneNumber,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release(); //데이터베이스 연결 해제
  }
};

// 사용자 정보 얻기
export const getUser = async (userId: number): Promise<any[] | null> => {
  const conn = await pool.getConnection();

  try {
    const [user]: any = await pool.query(`SELECT * FROM user WHERE id = ?;`, userId);

    console.log(user);

    if (user.length === 0) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (
  userId: number,
  foodCategoryId: string
): Promise<void> => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO prefer (food_id, user_id) VALUES (?, ?);`,
      [foodCategoryId, userId]
    );
    return;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (
  userId: number
): Promise<any[]> => {
  const conn = await pool.getConnection();

  try {
    const [preferences]: any = await pool.query(
      `SELECT p.food_id, p.user_id, fc.food_category
       FROM prefer p JOIN food_category fc on p.food_id = fc.id
       WHERE p.user_id = ? ORDER BY p.food_id ASC;`,
      userId
    );

    return preferences;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

// 음식점 데이터 삽입
export const addRestaurant = async (
  data: AddRestaurantData
): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result]: any = await pool.query(
      `INSERT INTO restaurant (name, food_category_id, address, region_id) VALUES (?, ?, ?, ?);`,
      [data.name, data.categoryId, data.address, data.regionId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};//음식점 데이터 삽입


export const getRestaurant = async (
  restaurantId: number
): Promise<any[] | null> => {
  const conn = await pool.getConnection();
  try {
    const [restaurant]: any = await pool.query(
      `SELECT r.id, r.name, r.address, rg.region, fc.food_category 
       FROM restaurant r
       JOIN region rg ON r.region_id = rg.id
       JOIN food_category fc ON r.food_category_id = fc.id
       WHERE r.id = ?;`,
      restaurantId
    );
    if (restaurant.length === 0) {
      return null;
    }
    return restaurant;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};//음식점 정보 얻기

export const addReview = async (
  data: AddReviewData
): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result]: any = await pool.query(
      `INSERT INTO review (restaurant_id, user_id, rate, review_text, created_at) 
       VALUES (?, ?, ?, ?, NOW(6));`,
      [data.restaurantId, data.userId, data.rate, data.reviewText]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};//리뷰 데이터 삽입

export const getReview = async (
  reviewId: number
): Promise<any[] | null> => {
  const conn = await pool.getConnection();
  try {
    const [review]: any = await pool.query(
      `SELECT r.restaurant_id, res.name, r.rate, r.review_text, r.created_at 
       FROM review r
       JOIN restaurant res ON r.restaurant_id = res.id
       WHERE r.id = ?;`,
      reviewId
    );
    if (review.length === 0) {
      return null;
    }
    return review;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};//리뷰 정보 얻기

export const addMission = async (
  data: AddMissionData
): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result]: any = await pool.query(
      `INSERT INTO mission (restaurant_id, min_cost, deadline, created_at, reward) 
       VALUES (?, ?, ?, NOW(6), 500);`,
      [data.restaurantId, data.minCost, data.deadline]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};//미션 데이터 삽입

export const getMission = async (
  missionId: number
): Promise<any[] | null> => {
  const conn = await pool.getConnection();
  try {
    const [mission]: any = await pool.query(
      `SELECT m.restaurant_id, r.name, m.min_cost, m.deadline 
       FROM mission m
       JOIN restaurant r ON m.restaurant_id = r.id
       WHERE m.id = ?;`,
      missionId
    );
    if (mission.length === 0) {
      return null;
    }
    return mission;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};//미션 정보 얻기

export const addUserMission = async (
  data: AddUserMissionData
): Promise<number | null> => {
  const conn = await pool.getConnection();
  try {
    const [result]: any = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user_mission WHERE mission_id = ? AND user_id = ?) as isExistUserMission;`,
      [data.missionId, data.userId]
    );
    if (result[0].isExistUserMission) {
      return null;
    }//미션을 이미 추가한 경우 null 반환

    const [insertResult]: any = await pool.query(
      `INSERT INTO user_mission (mission_id, user_id, completion, starting_day) 
       VALUES (?, ?, false, NOW());`,
      [data.missionId, data.userId]
    );
    return insertResult.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};//유저 미션 데이터 삽입

export const getUserMission = async (
  userMissionId: number
): Promise<any[] | null> => {
  const conn = await pool.getConnection();
  try {
    const [userMission]: any = await pool.query(
      `SELECT um.id, um.mission_id, um.user_id, um.starting_day
       FROM user_mission um
       WHERE um.id = ?;`,
      userMissionId
    );
    if (userMission.length === 0) {
      return null;
    }
    return userMission;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};//유저 미션 정보 얻기
