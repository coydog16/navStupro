import React from 'react';

interface PostCalendarProps {
  postDates: string[]; // ISO日付文字列（例: '2025-05-13'）の配列
}

// 指定日(today)の月の1日を取得
function getMonthDays(todayStr?: string): string[] {
  const days: string[] = [];
  const today = todayStr ? new Date(todayStr) : new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // 1日が何曜日か
  const startWeek = firstDay.getDay();
  // 月末日
  const endDate = lastDay.getDate();
  // 前月分の空白
  for (let i = 0; i < startWeek; i++) days.push('');
  // 今月の日付
  for (let d = 1; d <= endDate; d++) {
    const date = new Date(year, month, d);
    // JSTでYYYY-MM-DDを生成
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    days.push(`${y}-${m}-${dd}`);
  }
  // 末尾の空白（6行分になるよう調整）
  while (days.length % 7 !== 0) days.push('');
  return days;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const weekLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const PostCalendar: React.FC<PostCalendarProps & { today?: string }> = ({ postDates, today }) => {
  const days = getMonthDays(today);
  const postSet = new Set(postDates.map(date => date.slice(0, 10)));
  // 月名取得
  const baseDate = today ? new Date(today) : new Date();
  const monthLabel = `${monthNames[baseDate.getMonth()]} ${baseDate.getFullYear()}`;

  return (
    <div className="flex flex-col ml-4 w-32 items-end">
      <div className="text-xs font-bold text-gray-700 mb-0.5">{monthLabel}</div>
      <div className="grid grid-cols-7 gap-[2px]">
        {days.map((day, i) => (
          day ? (
            <div
              key={day}
              title={day}
              className={`w-3 h-3 rounded-sm border border-gray-200 ${postSet.has(day) ? 'bg-green-500' : 'bg-gray-200'}`}
              style={{ opacity: postSet.has(day) ? 1 : 0.5 }}
            />
          ) : (
            <div key={i} className="w-3 h-3" />
          )
        ))}
      </div>
    </div>
  );
};

export default PostCalendar;
