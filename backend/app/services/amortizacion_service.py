def calculate_schedule(
    amount,
    annual_rate,
    months
):

    monthly_rate = annual_rate / 12 / 100

    if monthly_rate == 0:

        payment = amount / months
        balance = amount
        schedule = []

        for month in range(1, months + 1):

            balance -= payment

            schedule.append({
                "month": month,
                "payment": round(payment, 2),
                "interest": 0,
                "principal": round(payment, 2),
                "balance": round(max(balance, 0), 2)
            })

        return schedule

    payment = (
        amount *
        monthly_rate *
        (1 + monthly_rate) ** months
    ) / (
        (1 + monthly_rate) ** months - 1
    )

    balance = amount

    schedule = []

    for month in range(1, months + 1):

        interest = balance * monthly_rate

        principal = payment - interest

        balance -= principal

        schedule.append({
            "month": month,
            "payment": round(payment, 2),
            "interest": round(interest, 2),
            "principal": round(principal, 2),
            "balance": round(balance, 2)
        })

    return schedule
