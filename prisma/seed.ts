import 'dotenv/config'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '../app/generated/prisma/client'

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const STATUSES = ['pending', 'confirmed', 'seated', 'completed', 'cancelled'] as const

const GUESTS = [
  { name: 'Alice Johnson',   email: 'alice@example.com',   phone: '021 111 2233' },
  { name: 'Ben Carter',      email: 'ben@example.com',     phone: null           },
  { name: 'Clara Nguyen',    email: 'clara@example.com',   phone: '021 555 6677' },
  { name: 'David Park',      email: 'david@example.com',   phone: '027 888 9900' },
  { name: 'Emma Wilson',     email: 'emma@example.com',    phone: null           },
  { name: 'Frank Torres',    email: 'frank@example.com',   phone: '022 333 4455' },
  { name: 'Grace Lee',       email: 'grace@example.com',   phone: '021 777 8899' },
  { name: 'Henry Brown',     email: 'henry@example.com',   phone: null           },
  { name: 'Isla Martinez',   email: 'isla@example.com',    phone: '027 123 4567' },
  { name: 'James Kim',       email: 'james@example.com',   phone: '022 987 6543' },
  { name: 'Karen White',     email: 'karen@example.com',   phone: null           },
  { name: 'Liam Patel',      email: 'liam@example.com',    phone: '021 246 8101' },
  { name: 'Mia Thompson',    email: 'mia@example.com',     phone: '027 369 1214' },
  { name: 'Noah Davis',      email: 'noah@example.com',    phone: null           },
  { name: 'Olivia Harris',   email: 'olivia@example.com',  phone: '022 112 3344' },
]

const NOTES = [
  'Window seat preferred',
  'Anniversary dinner — candles if possible',
  'Nut allergy, please notify kitchen',
  'High chair needed',
  'Celebrating a birthday',
  null,
  null,
  null,
]

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function dateAt(daysFromNow: number, hour: number, minute = 0): Date {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  d.setHours(hour, minute, 0, 0)
  return d
}

async function main() {
  const tables = [
    { number: 1, capacity: 2 },
    { number: 2, capacity: 2 },
    { number: 3, capacity: 4 },
    { number: 4, capacity: 4 },
    { number: 5, capacity: 4 },
    { number: 6, capacity: 6 },
    { number: 7, capacity: 6 },
    { number: 8, capacity: 8 },
    { number: 9, capacity: 8 },
    { number: 10, capacity: 10 },
  ]

  for (const table of tables) {
    await prisma.table.upsert({
      where: { number: table.number },
      update: {},
      create: table,
    })
  }

  console.log('Seeded 10 tables')

  const allTables = await prisma.table.findMany({ orderBy: { number: 'asc' } })

  const reservations = [
    // Past — completed
    { guest: GUESTS[0],  table: allTables[0], partySize: 2, date: dateAt(-7,  19, 30), status: 'completed', notes: NOTES[6] },
    { guest: GUESTS[1],  table: allTables[2], partySize: 3, date: dateAt(-5,  20,  0), status: 'completed', notes: NOTES[1] },
    { guest: GUESTS[2],  table: allTables[4], partySize: 4, date: dateAt(-3,  18, 30), status: 'completed', notes: NOTES[2] },
    { guest: GUESTS[3],  table: allTables[5], partySize: 5, date: dateAt(-2,  19,  0), status: 'completed', notes: NOTES[7] },
    { guest: GUESTS[4],  table: allTables[7], partySize: 6, date: dateAt(-1,  20, 30), status: 'completed', notes: NOTES[4] },
    // Past — cancelled
    { guest: GUESTS[5],  table: allTables[1], partySize: 2, date: dateAt(-4,  19,  0), status: 'cancelled', notes: NOTES[6] },
    { guest: GUESTS[6],  table: allTables[3], partySize: 4, date: dateAt(-6,  18,  0), status: 'cancelled', notes: NOTES[7] },
    // Today — seated right now
    { guest: GUESTS[7],  table: allTables[2], partySize: 3, date: dateAt( 0,  19,  0), status: 'seated',    notes: NOTES[3] },
    { guest: GUESTS[8],  table: allTables[5], partySize: 5, date: dateAt( 0,  19, 30), status: 'seated',    notes: NOTES[6] },
    // Today — confirmed, coming later
    { guest: GUESTS[9],  table: allTables[0], partySize: 2, date: dateAt( 0,  21,  0), status: 'confirmed', notes: NOTES[0] },
    { guest: GUESTS[10], table: allTables[8], partySize: 7, date: dateAt( 0,  21, 30), status: 'confirmed', notes: NOTES[7] },
    // Upcoming — confirmed
    { guest: GUESTS[11], table: allTables[1], partySize: 2, date: dateAt( 1,  19,  0), status: 'confirmed', notes: NOTES[4] },
    { guest: GUESTS[12], table: allTables[4], partySize: 4, date: dateAt( 1,  20,  0), status: 'confirmed', notes: NOTES[2] },
    { guest: GUESTS[13], table: allTables[6], partySize: 6, date: dateAt( 2,  18, 30), status: 'confirmed', notes: NOTES[1] },
    { guest: GUESTS[14], table: allTables[9], partySize: 8, date: dateAt( 3,  19,  0), status: 'confirmed', notes: NOTES[5] },
    // Upcoming — pending (not yet confirmed)
    { guest: GUESTS[0],  table: allTables[3], partySize: 4, date: dateAt( 2,  20, 30), status: 'pending',   notes: NOTES[7] },
    { guest: GUESTS[3],  table: allTables[7], partySize: 7, date: dateAt( 4,  19, 30), status: 'pending',   notes: NOTES[3] },
    { guest: GUESTS[6],  table: allTables[2], partySize: 3, date: dateAt( 5,  20,  0), status: 'pending',   notes: NOTES[0] },
    { guest: GUESTS[9],  table: allTables[5], partySize: 5, date: dateAt( 6,  18, 30), status: 'pending',   notes: NOTES[6] },
    { guest: GUESTS[12], table: allTables[8], partySize: 8, date: dateAt( 7,  19,  0), status: 'pending',   notes: NOTES[4] },
  ]

  for (const r of reservations) {
    await prisma.reservation.create({
      data: {
        guestName:  r.guest.name,
        guestEmail: r.guest.email,
        guestPhone: r.guest.phone,
        partySize:  r.partySize,
        date:       r.date,
        status:     r.status,
        notes:      r.notes ?? null,
        tableId:    r.table.id,
      },
    })
  }

  console.log(`Seeded ${reservations.length} reservations`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
