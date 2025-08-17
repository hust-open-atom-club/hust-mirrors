# Auto-generated script for Alpine Linux
# Generated from: alpine.md
# Mirror ID: alpine-linux

check() {
	source_os_release
	[ "$NAME" = "Alpine Linux" ]
}

_alpine-linux_install_1() {
	# 一键替换Alpine Linux软件源
	set_sudo

	if [ -f /etc/apk/repositories ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/alpine-linux__etc_apk_repositories.bak ] || $sudo cp /etc/apk/repositories ${_backup_dir}/alpine-linux__etc_apk_repositories.bak || {
			print_error "Backup /etc/apk/repositories failed"
			return 1
		}
		$sudo sed -i -E -e "s|dl-cdn\.alpinelinux\.org|$domain|g" /etc/apk/repositories || {
			print_error "Failed to update /etc/apk/repositories"
			return 1
		}
	else
		print_warning "File /etc/apk/repositories does not exist"
	fi

	return 0
}

_alpine-linux_install_2() {
	# 更新软件包索引
	set_sudo

	# Execute commands
	$sudo apk update

	return 0
}

install() {

	_alpine-linux_install_1 || return 1
	_alpine-linux_install_2 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/alpine-linux__etc_apk_repositories.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/alpine-linux__etc_apk_repositories.bak" /etc/apk/repositories 2>/dev/null || true
		print_info "Restored /etc/apk/repositories"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/alpine-linux__etc_apk_repositories.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f /etc/apk/repositories ] && grep -q "$domain" /etc/apk/repositories 2>/dev/null && return 0
	return 1
}
