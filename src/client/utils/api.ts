const headers = { 'content-type': 'application/json' };

interface KeyVal {
  [key: string]: string | number | boolean;
}

/**
 * Select record(s) from table
 *
 * select<I.User[]>('/api/users');
 * select<I.User>('/api/users', '123');
 * select<I.User>('/api/events', {state: 'active'});
 * is equivalent of sql
 * SELECT * FROM users;
 * SELECT * FROM users WHERE _id='123';
 * SELECT * FROM events WHERE state='active';
 */
export function select<T>(api: string, id?: string | KeyVal): Promise<T> {
  let url = api;
  if (id) {
    if (typeof id === 'string') {
      url = `${api}/${id}`;
    } else {
      const [key, val] = Object.entries(id)[0];
      url = encodeURI(`${api}/where?${key}=${val}`);
    }
  }

  return new Promise<T>((resolved, rejected) => {
    fetch(url, {
      method: 'GET'
    })
      .then((response) => resolved(response.json()))
      .catch((err: Error) => rejected(err));
  });
}

/**
 * Insert record into table
 *
 * insert<I.User>('/api/users', { name: 'Jon', surname: 'Snow'});
 * is equivalent of sql
 * INSERT INTO users (name, surname) VALUES ('Jon', 'Snow');
 */
export function insert<T>(api: string, data: T): Promise<T> {
  return new Promise<T>((resolved, rejected) => {
    fetch(api, {
      body: JSON.stringify(data),
      headers,
      method: 'POST'
    })
      .then((response) => resolved(response.json()))
      .catch((err: Error) => rejected(err));
  });
}

/**
 * Update record in table
 *
 * update<I.User>('/api/users', '123', { name: 'Jon', surname: 'Snow'});
 * is equivalent of sql
 * UPDATE users SET name='Jon', surname='Snow' WHERE _id=123;
 */
export function update<T>(api: string, id: string, data: T): Promise<T> {
  return new Promise<T>((resolved, rejected) => {
    fetch(`${api}/${id}`, {
      body: JSON.stringify(data),
      headers,
      method: 'PATCH'
    })
      .then((response) => resolved(response.json()))
      .catch((err: Error) => rejected(err));
  });
}

/**
 * Remove record from table
 *
 * remove('/api/users', '123');
 * is equivalent of sql
 * DELETE FROM users WHERE _id=123;
 */
export function remove(api: string, id: string): Promise<boolean> {
  return new Promise<boolean>((resolved, rejected) => {
    fetch(`${api}/${id}`, {
      headers,
      method: 'DELETE'
    })
      .then(() => resolved(true))
      .catch((err: Error) => rejected(err));
  });
}

/**
 * Incerease likes of card
 */
export function like(_id: string): Promise<number> {
  return new Promise<number>((resolved, rejected) => {
    fetch('/api/like', {
      body: JSON.stringify({ _id }),
      headers,
      method: 'POST'
    })
      .then((response) => response.json())
      .then((data: { likes: number }) => resolved(data.likes))
      .catch((err: Error) => rejected(err));
  });
}
